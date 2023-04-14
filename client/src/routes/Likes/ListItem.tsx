import { AntDesign, Ionicons } from "@expo/vector-icons";
import {  query,
  collection,
  limit,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData, } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HoldItem } from "react-native-hold-menu";
import { likesStyles } from "./styles";
import {Alert, Modal, StyleSheet, Pressable} from 'react-native';
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { colors } from "@/constants";
import { getFirestore, doc} from "firebase/firestore";
import { async } from "@firebase/util"

import { QueryKey } from "@/constants";
import { PlateDescriptionModal } from "@/components"


export default memo(
	({
		item,
		removeLikedPlate,
	}: {
		item: QueryDocumentSnapshot<DocumentData>;
		removeLikedPlate: Function;
	}) => {
		const [modalVisible, setModalVisible] = useState(false);
		const [currentPlateInfo, setCurrentPlateInfo] = useState<any>(null);
		const MenuItems = [
			{ text: "Actions", isTitle: true },
			{
				text: "Super Like",
				icon: () => <AntDesign name="heart" size={24} color="black" />,
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
				onPress: () => {
					setModalVisible(true);
				},
			},
			{
				text: "Delete",
				icon: () => <AntDesign name="delete" size={24} color="black" />,
				onPress: () => {
					removeLikedPlate(item.data().plateId);
				},
			},
		];

		
		return (
			<HoldItem items={MenuItems}>
				<View style={likesStyles.likeContainer}>
					<View
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
					</View>
					<TouchableOpacity
						onPress={() => removeLikedPlate(item.data().plateId)}
						style={likesStyles.removeLikeButton}
					>
						<AntDesign name="close" size={21} color="white" />
					</TouchableOpacity>
				</View>
				{/*  modal which shows the plate's info */}
				<PlateDescriptionModal
					visible={modalVisible}
					plateID={item.data().plateId}
					onDismiss={() => {
						setModalVisible(!modalVisible);
						
					}
				}
				/>





				{/* <Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={styles.modalHeader}>
								<Text style={styles.modalTitle}>
									{item.data().name}
								</Text>
								<TouchableOpacity
									style={[
										styles.button,
										styles.buttonClose,
									]}
									onPress={() =>
										{
											setCurrentPlateInfo(getPlateInfo(item.data().plateId));
											console.log(item.data().plateId);
											setModalVisible(!modalVisible);
										}
										
									}
								>
									<AntDesign name="close" size={24} color="white" />
								</TouchableOpacity>
							</View>
							{
								currentPlateInfo != null ? (
								<>
									<Text style={styles.modalText}>
										Description: 
									</Text>
									<Text style={styles.modalText}>
										Price: 
									</Text>
									<Text style={styles.modalText}>
										Location:
									</Text>
								</>	
							) : (
								<></>)
							}
						</View>
					</View>
				</Modal> */}
			</HoldItem>
		);
	}
		
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
