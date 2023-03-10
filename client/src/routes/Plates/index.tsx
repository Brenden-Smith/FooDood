import { createRef, LegacyRef, useCallback } from "react";
import {
	Image,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	ActivityIndicator,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import {
	collection,
	getFirestore,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
	httpsCallable,
	getFunctions,
	HttpsCallableResult,
} from "firebase/functions";
import * as Location from "expo-location";
import { styles } from "./styles";
import PreviousLikesCard from "./PreviousLikesCard";
import { Plate } from "@/types";
import { colors } from "@/constants";
import { Card } from "./Card";

const swiperRef: LegacyRef<Swiper<Plate>> = createRef();

export function Plates(): JSX.Element {
	const [data, setData] = useState<Plate[]>();
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [numInteractions, setNumInteractions] = useState(0);
	const [showPreviousLikes, setShowPreviousLikes] = useState(false);
	const getRecommendations = httpsCallable(
		getFunctions(),
		"getRecommendations",
	);
	const onSwiped = useCallback(() => {
		if (!(numInteractions % 6 == 5))
			setIndex((index + 1) % (data?.length ?? 0));
	}, [data, index]);

	const likePlate = useCallback(
		(plate: Plate) =>
			addDoc(collection(getFirestore(), "likes"), {
				plateId: plate.id,
				customerId: getAuth().currentUser?.uid,
				timestamp: serverTimestamp(),
				name: plate.name,
				image_url: plate.image_url,
			}),
		[],
	);

	const fetchPlates = useCallback(async () => {
		setLoading(true);
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === "granted") {
			const location = await Location.getCurrentPositionAsync();
			await getRecommendations({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				tags: ["hamburger"],
				radius: 40000,
			})
				.then((recommendations: HttpsCallableResult<any>) =>
					setData(recommendations.data?.flat() as any),
				)
				.catch((err) => console.log(err));
		} else {
			console.log(status);
		}
		setLoading(false);
	}, []);

	const renderCard = useCallback(
		(item: Plate) =>
			showPreviousLikes ? <PreviousLikesCard /> : <Card plate={item} />,
		[showPreviousLikes],
	);

	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<>
					<View style={{ flex: 1, width: "100%" }}>
						{data ? (
							<Swiper
								cards={data}
								onSwipedRight={(index) => {
									likePlate(data[index]);
									setNumInteractions(numInteractions + 1);
									if (numInteractions % 6 == 5) {
										// show the previous likes card which is the last card in the data array
										setShowPreviousLikes(true);
									} else {
										setShowPreviousLikes(false);
									}
								}}
								cardIndex={index}
								renderCard={renderCard}
								infinite
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
								showSecondCard={
									showPreviousLikes ? false : true
								}
								ref={swiperRef}
								overlayLabels={{
									left: {
										title: "DisLike",
										style: {
											label: {
												backgroundColor: colors.red,
												borderColor: colors.red,
												color: colors.white,
												borderWidth: 1,
												fontSize: 24,
											},
											wrapper: {
												flexDirection: "column",
												alignItems: "flex-end",
												justifyContent: "flex-start",
												marginTop: 500,
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
												fontSize: 24,
											},
											wrapper: {
												flexDirection: "column",
												alignItems: "flex-start",
												justifyContent: "flex-start",
												marginTop: 500,
												marginLeft: 20,
											},
										},
									},
								}}
							/>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
								}}
							>
								<TouchableOpacity
									onPress={fetchPlates}
									style={{
										backgroundColor: colors.blue,
										width: 200,
										height: 50,
										borderRadius: 10,
										justifyContent: "center",
										alignItems: "center",
										alignSelf: "center",
									}}
								>
									<Text
										style={{
											color: colors.white,
											fontSize: 20,
											flexWrap: "nowrap",
										}}
									>
										Get Plates
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<View style={{ flex: 1 }} />
					{/* add like and dislike buttons underneath the swiper which act as manual buttons for swiping */}
					{/* container for the buttons */}
					{/* <View style={styles.bottomContainerButtons}>
        <TouchableOpacity style={styles.likeButton} onPress={() => swiperRef.current.swipeRight()}>
          <Image source={require("../../assets/icons/like.png")} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowDescription(!showDescription)}
        >
          
          <Image source={require("../../assets/icons/view.png")} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dislikeButton}
          onPress={() => swiperRef.current.swipeLeft()}
        >
          
          <Image source={require("../../assets/icons/x.png")} style={styles.btnImage} />
        </TouchableOpacity>
      </View> */}

					{/* <View style={styles.bottomContainer}>
                    <Transitioning.View
                        transition={transition}
                        style={styles.bottomContainerMeta}
                    >
                        <CardDetails index={index} />
                    </Transitioning.View>
                </View> */}
				</>
			)}
		</SafeAreaView>
	);
}
