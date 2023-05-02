import { AntDesign, Ionicons } from "@expo/vector-icons";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HoldItem } from "react-native-hold-menu";
import { likesStyles } from "./styles";
import { StyleSheet } from "react-native";
import { colors } from "@/constants";
import { PlateDescriptionModal } from "@/components";

export default memo(
	({
		item,
		removeLikedPlate,
	}: {
		item: QueryDocumentSnapshot<DocumentData>;
		removeLikedPlate: Function;
	}) => {
		const [visible, setVisible] = useState(false);

		return (
			<>
				{/* <HoldItem
					items={[
						{ text: "Actions", isTitle: true },
						{
							text: "Super Like",
							icon: () => (
								<AntDesign
									name="heart"
									size={24}
									color="black"
								/>
							),
							onPress: () => {},
						},
						{
							text: "Info",
							icon: () => (
								<Ionicons
									name="information-circle-outline"
									size={24}
									color="black"
								/>
							),
							// when pressed, show a modal with the plate's info
							onPress: (i) => {
								setPlateID(i.data().plateId);
							},
						},
						{
							text: "Delete",
							icon: () => (
								<AntDesign
									name="delete"
									size={24}
									color="black"
								/>
							),
							onPress: () => {
								removeLikedPlate(item.data().plateId);
							},
						},
					]}
				> */}
					<View style={likesStyles.likeContainer}>
					<TouchableOpacity
							onPress={() => setVisible(true)}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginRight: 15,
							}}
						>
							<Image
								source={{ uri: item.data().image_url }}
								style={likesStyles.likedImage}
							/>
							<Text
								style={{
									fontSize: 18,
									flexWrap: "wrap",
									maxWidth: 150,
									textAlign: "left",
								}}
							>
								{item.data().name}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								removeLikedPlate(item.data().plateId)
							}
							style={likesStyles.removeLikeButton}
						>
							<AntDesign name="close" size={21} color="white" />
						</TouchableOpacity>
					</View>
				{/* </HoldItem> */}
				<PlateDescriptionModal
					visible={visible}
					plateID={item.data().plateId}
					onDismiss={() => setVisible(false)}
				/>
			</>
		);
	},
);
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		width: "100%",
	},
	modalView: {
		margin: 20,
		width: "80%",
		backgroundColor: colors.white,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		alignSelf: "center",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: colors.red,
		padding: 12,
		maxHeight: 50,
	},
	textStyle: {
		color: colors.white,
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
