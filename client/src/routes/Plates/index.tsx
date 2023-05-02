import { createRef, LegacyRef, useCallback, useEffect, useMemo } from "react";
import {
	View,
	SafeAreaView,
	ActivityIndicator,
	Text,
	TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import {
	collection,
	getFirestore,
	addDoc,
	serverTimestamp,
	query,
	where,
	limit,
	startAfter,
	QueryDocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import * as Location from "expo-location";
import { styles } from "./styles";
import PreviousLikes from "./PreviousLikes";
import { Plate, RootStackParamList } from "@/types";
import { colors, QueryKey } from "@/constants";
import { Card } from "./Card";
import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import { useFunctionsQuery } from "@react-query-firebase/functions";
import { useQuery } from "react-query";
import { useLikes, useUserData } from "@/hooks";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const swiperRef = createRef<Swiper<Plate>>();

export function Plates({
	route,
}: NativeStackScreenProps<RootStackParamList, "Plates">): JSX.Element {
	const user = useUserData();
	const likes = useLikes();
	const location = useQuery(QueryKey.LOCATION, async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === "granted") {
			const location = await Location.getCurrentPositionAsync();
			return location;
		}
	});
	const businesses = useFunctionsQuery<any, any[]>(
		[
			QueryKey.BUSINESSES,
			...(user.data?.data()?.tags ?? []),
			route?.params?.lucky,
		],
		getFunctions(),
		"getRecommendations",
		{
			latitude: location.data?.coords.latitude,
			longitude: location.data?.coords.longitude,
			radius: 40000,
			lucky: route?.params?.lucky,
		},
		{},
		{
			enabled:
				!!location.data && !!user.data && !!user.data?.data()?.tags,
		},
	);
	const platesQuery = useMemo(
		() =>
			query(
				collection(getFirestore(), "plates"),
				where(
					"businessId",
					"in",
					businesses.data?.map((b) => b.id) ?? [""],
				),
			),
		[businesses.data],
	);
	const plates = useFirestoreInfiniteQuery(
		[QueryKey.PLATES, businesses.data, route?.params?.lucky],
		query(platesQuery, limit(5)),
		(snapshot) => {
			const lastDocument = snapshot.docs[snapshot.docs.length - 1];
			return (
				lastDocument &&
				query(
					platesQuery,
					limit(
						1 +
							(snapshot.docs.length - index >= 5
								? 0
								: 5 - (snapshot.docs.length - index)),
					),
					startAfter(lastDocument),
				)
			);
		},
		{},
		{
			enabled: !!businesses.data,
		},
	);
	const [index, setIndex] = useState(0);
	const [numInteractions, setNumInteractions] = useState(0);
	const [showPreviousLikes, setShowPreviousLikes] = useState(false);
	const [endReached, setEndReached] = useState(false);
	const data = useMemo(
		() => plates.data?.pages.flatMap((page) => page.docs) ?? [],
		[plates.data],
	);

	// Swipe
	const onSwiped = useCallback(() => {
		plates.fetchNextPage();
		setIndex((index + 1) % (data?.length ?? 0));
		if (numInteractions % 4 === 3) {
			setShowPreviousLikes(true);
		}
	}, [plates.data, index, numInteractions, showPreviousLikes, index, data]);

	// Like
	const onSwipedRight = useCallback(
		(i: number) => {
			const plate = data?.[i];
			if (plate && !likes.data?.docs.some((like) => like.id == plate.id))
				addDoc(collection(getFirestore(), "likes"), {
					plateId: plate.id,
					customerId: getAuth().currentUser?.uid,
					timestamp: serverTimestamp(),
					name: plate.data()?.name,
					image_url: plate.data()?.image_url,
					tags: plate.data()?.tags,
					ttl: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
				}),
					setNumInteractions(numInteractions + 1);
		},
		[data, numInteractions, likes.data],
	);

	// Super like
	const onSwipedTop = useCallback(
		(i: number) => {
			const plate = data?.[i];
			if (plate)
				addDoc(collection(getFirestore(), "likes"), {
					plateId: plate.id,
					customerId: getAuth().currentUser?.uid,
					timestamp: serverTimestamp(),
					name: plate.data()?.name,
					image_url: plate.data()?.image_url,
					tags: plate.data()?.tags,
					super: true,
				}),
					setNumInteractions(numInteractions + 1);
		},
		[data, numInteractions],
	);

	// Render card
	const renderCard = useCallback(
		(item: QueryDocumentSnapshot<DocumentData>) =>
			item && (
				<Card
					plate={item}
					liked={
						likes.data?.docs.some(
							(like) => like.data()?.plateId == item.id,
						) ?? false
					}
				/>
			),
		[likes.data],
	);

	// Render page
	return (
		<SafeAreaView style={styles.container}>
			{!user.data?.data()?.tags ? (
				<Text>Please select some tags to get started!</Text>
			) : location.isLoading ||
			  location.isFetching ||
			  plates.isLoading ||
			  businesses.isLoading ||
			  (plates.isFetching && !plates.isFetchingNextPage) ||
			  businesses.isFetching ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator size="large" color="black" />
					<Text>Fetching plates...</Text>
				</View>
			) : data.length > 0 ? (
				endReached ? (
					<View
						style={{
							flex: 1,

							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontSize: 20 }}>
							No more plates to show!
						</Text>
						<Text style={{ fontSize: 20 }}>
							Try changing your tags or choosing a plate from your
							previous likes!
						</Text>
					</View>
				) : (
					<>
						<PreviousLikes
							visible={showPreviousLikes}
							setVisible={setShowPreviousLikes}
						/>
						<Swiper
							ref={swiperRef as any}
							cards={data}
							onSwipedRight={onSwipedRight}
							onSwipedTop={onSwipedTop}
							cardIndex={index}
							renderCard={renderCard}
							backgroundColor={"transparent"}
							onSwiped={onSwiped}
							cardVerticalMargin={40}
							onSwipedAll={() => setEndReached(true)}
							stackSize={5}
							stackScale={8}
							stackSeparation={30}
							stackAnimationFriction={7}
							stackAnimationTension={40}
							disableBottomSwipe
							animateOverlayLabelsOpacity
							animateCardOpacity
							showSecondCard={true}
							containerStyle={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								position: "absolute",
							}}
							overlayLabels={{
								left: {
									title: "Dislike",
									style: {
										label: {
											backgroundColor: colors.red,
											borderColor: colors.red,
											color: colors.white,
											borderWidth: 1,
											fontSize: 32,
										},
										wrapper: {
											flexDirection: "column",
											alignItems: "flex-end",
											justifyContent: "flex-start",
											marginTop: 30,
											marginLeft: -20,
										},
									},
								},
								right: {
									title: "Like",
									style: {
										label: {
											backgroundColor: colors.blue,
											borderColor: colors.blue,
											color: colors.white,
											borderWidth: 1,
											fontSize: 32,
										},
										wrapper: {
											flexDirection: "column",
											alignItems: "flex-start",
											justifyContent: "flex-start",
											marginTop: 30,
											marginLeft: 20,
										},
									},
								},
							}}
						/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.dislikeButton}
								onPress={() => {
									swiperRef?.current?.swipeLeft();
								}}
							>
								<MaterialIcons
									name="thumb-down"
									size={40}
									color="white"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.superLikeButton}
								onPress={() => {
									swiperRef?.current?.swipeTop();
								}}
							>
								<AntDesign
									name="heart"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.likeButton}
								onPress={() => {
									swiperRef?.current?.swipeRight();
								}}
							>
								<MaterialIcons
									name="thumb-up"
									size={40}
									color="white"
								/>
							</TouchableOpacity>
						</View>
					</>
				)
			) : (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text>No results. {":("}</Text>
				</View>
			)}
		</SafeAreaView>
	);
}
