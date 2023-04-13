import { createRef, LegacyRef, useCallback, useEffect, useMemo } from "react";
import { View, SafeAreaView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
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
import PreviousLikesCard from "./PreviousLikesCard";
import { Plate } from "@/types";
import { colors, QueryKey } from "@/constants";
import { Card } from "./Card";
import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import { useFunctionsQuery } from "@react-query-firebase/functions";
import { useQuery } from "react-query";
import { useUserData } from "@/hooks";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const swiperRef = createRef<Swiper<Plate>>();

export function Plates(): JSX.Element {
	const [platesQuery, setPlatesQuery] = useState<any>(null);
	const [businesses, setBusinesses] = useState<any[]>([]);
	const user = useUserData();
	const location = useQuery(QueryKey.LOCATION, async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === "granted") {
			const location = await Location.getCurrentPositionAsync();
			return location;
		}
	});
	const businessIds = useFunctionsQuery<any, any[]>(
		[QueryKey.BUSINESSES, ...user.data?.data()?.tags ?? []],
		getFunctions(),
		"getRecommendations",
		{
			latitude: location.data?.coords.latitude,
			longitude: location.data?.coords.longitude,
			radius: 40000,
		},
		{},
		{
			enabled: !!location.data && !!user.data && !!user.data?.data()?.tags,
			onSuccess: (data) => {
				setBusinesses(data);
				setPlatesQuery(
					query(
						collection(getFirestore(), "plates"),
						where(
							"businessId",
							"in",
							data
								.sort(() => Math.random() - 0.5)
								.slice(0, 10)
								.map((business) => business.id),
						),
						limit(5),
					),
				);
			},
		},
	);
	const plates = useFirestoreInfiniteQuery(
		[QueryKey.PLATES, platesQuery],
		platesQuery,
		(snapshot) => {
			const lastDocument = snapshot.docs[snapshot.docs.length - 1];
			return query(
				collection(getFirestore(), "plates"),
				where(
					"businessId",
					"in",
					businesses
						.sort(() => Math.random() - 0.5)
						.slice(0, 10)
						.map((business) => business.id),
				),
				limit(5),
				startAfter(lastDocument),
			);
		},
		{},
		{
			enabled: !!businessIds && !!platesQuery,
			onSuccess: (data) => {
				console.log("Plates fetched");
			},
		},
	);
	const [index, setIndex] = useState(0);
	const [numInteractions, setNumInteractions] = useState(0);
	const [showPreviousLikes, setShowPreviousLikes] = useState(false);
	const onSwiped = useCallback(() => {
		if (!(numInteractions % 6 == 5))
			setIndex((index + 1) % (data?.length ?? 0));
	}, [plates.data, index]);
	const data = useMemo(
		() => plates.data?.pages.flatMap((page) => page.docs) ?? [],
		[plates.data],
	);

	const onSwipedRight = useCallback(
		(i: number) => {
			const plate = data?.[i];
			if (plate)
				addDoc(collection(getFirestore(), "likes"), {
					plateId: plate.id,
					customerId: getAuth().currentUser?.uid,
					timestamp: serverTimestamp(),
					name: plate.data()?.name,
					image_url: plate.data()?.image_url,
				}),
					setNumInteractions(numInteractions + 1);
			if (numInteractions % 6 == 5) {
				// show the previous likes card which is the last card in the data array
				setShowPreviousLikes(true);
			} else {
				setShowPreviousLikes(false);
			}
		},
		[data, numInteractions],
	);

	const onSwipedLeft = useCallback(() => {
		if (showPreviousLikes) {
			setShowPreviousLikes(false);
		}
	}, [showPreviousLikes]);

	const renderCard = useCallback(
		(item: QueryDocumentSnapshot<DocumentData>) =>
			showPreviousLikes ? (
				<PreviousLikesCard />
			) : (
				item && item.data()?.image_url && <Card plate={item} />
			),
		[showPreviousLikes],
	);

	useEffect(() => {
		if (index == data.length - 2) {
			plates.fetchNextPage();
		}
	}, [index, plates.data]);

	return (
		<SafeAreaView style={styles.container}>
			{!user.data?.data()?.tags ? (
				<Text>
					Please select some tags to get started!
				</Text>
			) : !plates.data ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Swiper
					ref={swiperRef as any}
					cards={data}
					onSwipedRight={onSwipedRight}
					onSwipedLeft={onSwipedLeft}
					cardIndex={index}
					renderCard={renderCard}
					backgroundColor={"transparent"}
					onSwiped={onSwiped}
					cardVerticalMargin={40}
					stackSize={4}
					stackScale={8}
					stackSeparation={30}
					stackAnimationFriction={7}
					stackAnimationTension={40}
					disableBottomSwipe
					animateOverlayLabelsOpacity
					animateCardOpacity
					showSecondCard={showPreviousLikes ? false : true}
					containerStyle={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
					}}
					overlayLabels={{
						left: {
							title: showPreviousLikes ? "" : "Dislike",
							style: {
								label: {
									backgroundColor: showPreviousLikes
										? "transparent"
										: colors.red,
									borderColor: showPreviousLikes
										? "transparent"
										: colors.red,
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
							title: showPreviousLikes ? "" : "Like",
							style: {
								label: {
									backgroundColor: showPreviousLikes
										? "transparent"
										: colors.blue,
									borderColor: showPreviousLikes
										? "transparent"
										: colors.blue,
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
			)}
			{/* add like and dislike buttons underneath the swiper which act as manual buttons for swiping using the swiper ref */}
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.dislikeButton}
					onPress={() => {
						swiperRef?.current?.swipeLeft();
					}}
				>
					<MaterialIcons name="thumb-down" size={40} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.superLikeButton}
					onPress={() => {
						swiperRef?.current?.swipeLeft();
					}}
				>
					<AntDesign name="heart" size={30} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.likeButton}
					onPress={() => {
						swiperRef?.current?.swipeRight();
					}}
				>
					<MaterialIcons name="thumb-up" size={40} color="white" />
				</TouchableOpacity>
			</View>
			
			{/* <View style={styles.bottomContainer}>
                    <Transitioning.View
                        transition={transition}
                        style={styles.bottomContainerMeta}
                    >
                        <CardDetails index={index} />
                    </Transitioning.View>
                </View> */}
		</SafeAreaView>
	);
}
