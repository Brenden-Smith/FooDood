import { createRef, memo, useCallback, useEffect } from "react";
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
	QueryDocumentSnapshot,
	DocumentData,
	QuerySnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { styles } from "./styles";
import PreviousLikes from "./PreviousLikes";
import { Plate, RecommendedPlatesQuery, RootStackParamList } from "@/types";
import { colors } from "@/theme";
import { Card } from "./Card";
import { useLikes, useRecommendedPlates, useUserData } from "@/hooks";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

const swiperRef = createRef<Swiper<Plate>>();

/**
 * Plates screen
 * @returns {JSX.Element}
 */
export function Plates({
	route,
}: NativeStackScreenProps<RootStackParamList, "Plates">): JSX.Element {
	const user = useUserData();
	const plates = useRecommendedPlates(route?.params?.lucky ?? false);
	const data = plates.data?.pages.flatMap((page) => page.docs) ?? [];
	const [endReached, setEndReached] = useState(false);

	useEffect(() => {
		setEndReached(false);
	}, [plates.key]);

	// Render page
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="light" />
			{!user.data?.data()?.tags ||
			user.data?.data()?.tags.length === 0 ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: "Cabin_400Regular",
							fontSize: 20,
						}}
					>
						Please select some tags to get started!
					</Text>
				</View>
			) : plates.isLoading ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator size="large" color="black" />
					<Text
						style={{
							fontSize: 20,
							fontFamily: "Lobster_400Regular",
							marginTop: 20,
						}}
					>
						Fetching plates...
					</Text>
				</View>
			) : data.length > 0 && endReached ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: "Cabin_400Regular",
							fontSize: 20,
							textAlign: "center",
							marginBottom: 15,
						}}
					>
						No more plates to show!
					</Text>
					<Text
						style={{
							fontFamily: "Cabin_400Regular",
							fontSize: 20,
							textAlign: "center",
						}}
					>
						Try changing your tags or choosing a plate from your
						previous likes!
					</Text>
				</View>
			) : data.length > 0 ? (
				<PlatesDeck
					plates={plates}
					setEndReached={setEndReached}
					key={plates.key}
				/>
			) : (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text>No results. {":("}</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const PlatesDeck = memo(
	({
		plates,
		setEndReached,
	}: {
		plates: RecommendedPlatesQuery;
		setEndReached: React.Dispatch<React.SetStateAction<boolean>>;
	}) => {
		const likes = useLikes();
		const [index, setIndex] = useState(0);
		const [numInteractions, setNumInteractions] = useState(0);
		const [showPreviousLikes, setShowPreviousLikes] = useState(false);
		const data = plates.data?.pages.flatMap((page) => page.docs) ?? [];
		const [disabled, setDisabled] = useState(false);
		const timeout = useCallback(() => {
			setDisabled(true);
			setTimeout(() => setDisabled(false), 750);
		}, []);

		// Swipe
		const onSwiped = useCallback(() => {
			plates.fetchNextPage();
			timeout();
			setIndex((index + 1) % (data?.length ?? 0));
			if (numInteractions % 4 === 3) {
				setShowPreviousLikes(true);
			}
		}, [
			plates.data,
			index,
			numInteractions,
			showPreviousLikes,
			index,
			data,
			timeout,
		]);

		// Like
		const onSwipedRight = useCallback(
			(i: number) => {
				timeout();
				const plate = data?.[i];
				if (
					plate &&
					!likes.data?.docs.some((like) => like.id == plate.id)
				)
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
			[data, numInteractions, likes.data, timeout],
		);

		// Super like
		const onSwipedTop = useCallback(
			(i: number) => {
				timeout();
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
			[data, numInteractions, timeout],
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

		return (
			<>
				<PreviousLikes
					visible={showPreviousLikes}
					setVisible={setShowPreviousLikes}
				/>
				<Swiper
					ref={swiperRef as any}
					disableLeftSwipe={plates.isFetchingNextPage || disabled}
					disableRightSwipe={plates.isFetchingNextPage || disabled}
					disableTopSwipe={plates.isFetchingNextPage || disabled}
					cards={data ?? []}
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
									fontFamily: "Cabin_400Regular",
								},
								wrapper: {
									flexDirection: "column",
									alignItems: "flex-end",
									justifyContent: "flex-start",
									marginTop: 60,
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
									fontFamily: "Cabin_400Regular",
								},
								wrapper: {
									flexDirection: "column",
									alignItems: "flex-start",
									justifyContent: "flex-start",
									marginTop: 60,
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
						disabled={plates.isFetchingNextPage || disabled}
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
						disabled={plates.isFetchingNextPage || disabled}
					>
						<AntDesign name="heart" size={30} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.likeButton}
						onPress={() => {
							swiperRef?.current?.swipeRight();
						}}
						disabled={plates.isFetchingNextPage || disabled}
					>
						<MaterialIcons
							name="thumb-up"
							size={40}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</>
		);
	},
);
