import { memo } from "react";
import {
	Modal,
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	Linking,
	Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePlateData } from "@/hooks";
import { colors } from "@/theme";
import { useBusiness } from "@/hooks/useBusiness"

function navigateToLocation(address: string) {
	// detect if the operating system is ios or android
	// if ios, use apple maps
	// if android, use google maps
	if (Platform.OS === "ios") {
		Linking.openURL(`maps://app?address=${address}`);
	}
	if (Platform.OS === "android") {
		Linking.openURL(`google.navigation:q=${address}`);
	}
	
}


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
		const businessData = useBusiness(plateData.data?.data()?.businessId);	

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
							{/* create a button which links the user to the proper location using expo linking */}
							<Text style={styles.subHeading}>Business Location</Text>
							<Text style={styles.modalText}>
								{businessData.data?.data()?.address}
							</Text>
							<TouchableOpacity onPress={navigateToLocation(businessData.data?.data()?.address)}>
								<MaterialCommunityIcons
									name="map-marker"
									size={30}
									color="white"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	},
);

const styles = StyleSheet.create({
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
		height: "100%",
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
