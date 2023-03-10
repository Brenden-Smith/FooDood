import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HoldItem } from "react-native-hold-menu";
import { likesStyles } from "./styles";

export default memo(
	({
		item,
		removeLikedPlate,
	}: {
		item: QueryDocumentSnapshot<DocumentData>;
		removeLikedPlate: Function;
	}) => {
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
				onPress: () => {},
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
								maxWidth: 200,
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
			</HoldItem>
		);
	},
);
