import { memo, useCallback, useEffect } from "react";
import {
	Modal,
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	Platform,
	Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePlateData } from "@/hooks";
import { colors } from "@/theme";
import { useBusiness } from "@/hooks/useBusiness";
import { Entypo } from '@expo/vector-icons';





export const PlateDescriptionModal = memo(
	({
		visible,
		onDismiss,
		plateID,
	}: {
		visible: boolean;
		onDismiss: () => void;
		plateID: string;
	}) => {
		const plateData = usePlateData(plateID, visible);
		const businessData = useBusiness(
			plateData.data?.data()?.businessId,
			visible,
		);
		

		const navigateToLocation = useCallback(() => {
			// parse the address from the location
			const restaurantLocation = businessData.data?.data()?.location;
			console.log(restaurantLocation);
			// parse the address from the location
			const display_address = restaurantLocation?.display_address;
			// for each item in the display address array append it to the address string
			const addressString = businessData.data?.data()?.location.display_address.join(" ")
			// if there is no address string then set the address string to the coordinates of the location
			if (addressString.length === 0) {
				const coordinates = restaurantLocation?.coordinates;
				addressString.push(coordinates?.latitude);
				addressString.push(coordinates?.longitude);
			}
			// if the platform is ios then open the maps app
			if (Platform.OS === "ios") {
				Linking.openURL(
					`maps://app?address=${addressString}`,
				);
			}
			// if the platform is android then open the google maps app
			if (Platform.OS === "android") {
				Linking.openURL(
					`google.navigation:q=${addressString}`,
				);
			}

		}, [businessData.data]);

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={onDismiss}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.imageContainer}>
							<Image
								source={{
									uri: plateData.data?.data()?.image_url,
								}}
								style={styles.modalImage}
							/>
						</View>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>
								{plateData.data?.data()?.name}
							</Text>
							<TouchableOpacity onPress={onDismiss}>
								<MaterialCommunityIcons
									name="close"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.modalBody}>
							<Text style={styles.subHeading}>Business Name</Text>
							<Text style={styles.modalText}>
								{plateData.data?.data()?.businessName}
							</Text>

							<Text style={styles.subHeading}>Description</Text>
							<Text style={styles.modalText}>
								{plateData.data?.data()?.description}
							</Text>

							<Text style={styles.subHeading}>Price</Text>
							<Text style={styles.modalText}>
								{plateData.data?.data()?.price}
							</Text>

							<View style={styles.modalTagsContainer}>
								<Text style={styles.subHeading}>Tags</Text>
								{plateData.data
									?.data()
									?.tags?.map((tag: string) => (
										<Text style={styles.modalTag} key={tag}>
											{tag}
										</Text>
									))}
							</View>
							<Text style={styles.subHeading}>
								Business Location
							</Text>
							<Text style={styles.modalText}>
								{businessData.data?.data()?.location.display_address.join(" ") || "No address available"}
							</Text>
							
							<Text style={styles.subHeading}>Business Phone Number</Text>
							{/* use the linking library to open the phone app and call the business phone number */}
							<Text style={styles.modalText}>
								{businessData.data?.data()?.display_phone}
							</Text>
							<View style={styles.bottomIconsContainer}>
								<TouchableOpacity onPress={() => Linking.openURL(`tel:${businessData.data?.data()?.phone}`)}>
									<MaterialCommunityIcons name="phone" size={30} color={colors.creamPurple} style={styles.bottomIcons}/>
								</TouchableOpacity>
								<TouchableOpacity onPress={navigateToLocation}>
									<MaterialCommunityIcons
										name="map-marker"
										size={30}
										color={colors.creamGreen}
										style={styles.bottomIcons}
									/>
								</TouchableOpacity>
								{/* link to the business yelp page with a yelp icon */}
								<TouchableOpacity onPress={() => Linking.openURL(businessData.data?.data()?.url)}>
									<Entypo name="yelp" size={30} color="red" style={styles.bottomIcons}/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	},
);

const styles = StyleSheet.create({
	bottomIconsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomIcons: {
		margin: 10,
		padding: 10,
		backgroundColor: colors.white,
		borderRadius: 4
	},


	centeredView: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		display: "flex",
		flex: 0.8,
		width: "90%",
		backgroundColor: colors.white,
		borderRadius: 20,
		padding: 35,
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
	modalHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.white,
	},
	modalBody: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 16,
		textAlign: "center",
		color: colors.white,

		// to allign text to bottom of the container
	},
	subHeading: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.white,
	},
	modalTagsContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
	modalTag: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.creamGreen,
		borderRadius: 12,
		padding: 10,
		margin: 5,
	},
	modalImage: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "50%",
		resizeMode: "cover",
		overflow: "hidden",
		borderRadius: 15,
		flex: 1,
	},
	imageContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
});
