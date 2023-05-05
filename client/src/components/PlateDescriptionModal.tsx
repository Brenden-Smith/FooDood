import { useBusiness, usePlateData } from "@/hooks";
import { colors } from "@/theme";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo, useCallback } from "react";
import {
	Linking,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export const PlateDescriptionModal = memo(
	({
		plateID,
		visible,
		setVisible,
	}: {
		plateID?: string;
		visible: boolean;
		setVisible: (visible: boolean) => void;
	}) => {
		const onDismiss = useCallback(() => setVisible(false), [setVisible]);
		const plate = usePlateData(plateID, visible);
		const business = useBusiness(plate.data?.data()?.businessId, visible);
		const navigateToLocation = useCallback(() => {
			const restaurantLocation = business.data?.data()?.location;
			console.log(restaurantLocation);
			const addressString = business.data
				?.data()
				?.location.display_address.join(" ");
			if (addressString.length === 0) {
				const coordinates = restaurantLocation?.coordinates;
				addressString.push(coordinates?.latitude);
				addressString.push(coordinates?.longitude);
			}
			if (Platform.OS === "ios") {
				Linking.openURL(`maps://app?address=${addressString}`);
			} else if (Platform.OS === "android") {
				Linking.openURL(`google.navigation:q=${addressString}`);
			}
		}, [business.data]);
		return (
			<Modal visible={visible} transparent={true} animationType="fade">
				<View style={styles.modalInner}>
					<View style={styles.container}>
						<TouchableOpacity
							style={styles.close}
							onPress={onDismiss}
						>
							<AntDesign
								name="close"
								size={30}
								color="white"
								style={styles.closeIcon}
							/>
						</TouchableOpacity>
						<Image
							style={styles.image}
							source={plate.data?.data()?.image_url}
						/>
						<View style={styles.actions}>
							<TouchableOpacity
								onPress={() =>
									Linking.openURL(
										`tel:${business.data?.data()?.phone}`,
									)
								}
							>
								<MaterialCommunityIcons
									name="phone"
									size={30}
									color={colors.creamPurple}
									style={styles.action}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={navigateToLocation}>
								<MaterialCommunityIcons
									name="map-marker"
									size={30}
									color={colors.creamGreen}
									style={styles.action}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() =>
									Linking.openURL(business.data?.data()?.url)
								}
							>
								<Entypo
									name="yelp"
									size={30}
									color="red"
									style={styles.action}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.header}>
							<Text style={styles.title}>
								{plate.data?.data()?.name}
							</Text>
							<Text style={styles.price}>
								{plate.data?.data()?.price}
							</Text>
						</View>
						<View style={styles.details}>
							<Text style={styles.detailRestaurant}>
								{business.data?.data()?.name}
							</Text>
							<Text style={styles.detail}>
								{business.data
									?.data()
									?.location.display_address.join(" ") ||
									"No address available"}
							</Text>
						</View>
						<View style={styles.description}>
							<Text style={styles.descriptionText}>
								{plate.data?.data()?.description}
							</Text>
						</View>
						<View style={styles.tags}>
							{plate.data?.data()?.tags?.map((tag: string) => (
								<View style={styles.tagContainer} key={tag}>
									<Text style={styles.tag}>{tag}</Text>
								</View>
							))}
						</View>
					</View>
				</View>
			</Modal>
		);
	},
);

const styles = StyleSheet.create({
	modalInner: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
		height: "100%",
		width: "100%",
		padding: 25,
		flex: 1,
		alignContent: "center",
	},
	container: {
		display: "flex",
		flex: 0.8,
		marginTop: 40,
		marginBottom: 25,
		backgroundColor: colors.white,
		width: "100%",
		borderRadius: 20,
		alignItems: "center",
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		width: "100%",
		height: "50%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	close: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
	},
	closeIcon: {
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 15,
		marginTop: 15,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Cabin_700Bold",
	},
	price: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Cabin_500Medium",
	},
	details: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		paddingHorizontal: 15,
		marginTop: 15,
	},
	detail: {
		fontSize: 16,
		fontWeight: "bold",
		fontFamily: "Cabin_400Regular",
		color: colors.gray,
	},
	detailRestaurant: {
		fontSize: 16,
		fontWeight: "bold",
		fontFamily: "Cabin_400Regular",
		color: colors.creamPurple,
		marginTop: 15,
	},
	description: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		paddingHorizontal: 15,
		marginTop: 15,
	},
	descriptionText: {
		fontSize: 16,
		fontWeight: "bold",
		fontFamily: "Cabin_400Regular",
	},
	actions: {
		position: "absolute",
		bottom: "50%",
		right: 0,
		display: "flex",
		flexDirection: "row",
	},
	action: {
		margin: 10,
		padding: 10,
		backgroundColor: colors.white,
		borderRadius: 4,
	},
	tags: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		paddingHorizontal: 15,
		marginTop: 15,
		marginBottom: 25,
	},
	tagContainer: {
		backgroundColor: colors.cream,
		padding: 5,
		borderRadius: 20,
		marginRight: 5,
		marginBottom: 5,
	},
	tag: {
		fontSize: 16,
		fontWeight: "bold",
		fontFamily: "Cabin_400Regular",
	},
});
