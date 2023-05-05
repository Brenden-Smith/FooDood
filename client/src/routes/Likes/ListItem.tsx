import { AntDesign } from "@expo/vector-icons";
import {
	QueryDocumentSnapshot,
	DocumentData,
	deleteDoc,
} from "firebase/firestore";
import { memo, useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "@/theme";
import { PlateDescriptionModal } from "@/components";
import { Image } from "expo-image";

export default memo(
	({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => {
		const [visible, setVisible] = useState(false);
		const onPress = useCallback(() => deleteDoc(item.ref), [item.ref]);

		return (
			<>
				<View style={styles.likeContainer}>
					<TouchableOpacity
						onPress={() => setVisible(true)}
						style={styles.likeTouchable}
					>
						<Image
							source={{ uri: item.data().image_url }}
							style={styles.likedImage}
							contentFit="cover"
						/>
						{item.data().super && <View style={styles.superLike}>
							<AntDesign name="star" size={18} color="white" />
						</View>}
						<Text style={styles.name}>{item.data().name}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onPress}
						style={styles.removeLikeButton}
					>
						<AntDesign name="close" size={21} color="white" />
					</TouchableOpacity>
				</View>
				<PlateDescriptionModal
					visible={visible}
					plateID={item.data().plateId}
					setVisible={setVisible}
				/>
			</>
		);
	},
);

const styles = StyleSheet.create({
	likeContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 10,
		padding: 10,
		borderRadius: 10,
		flexWrap: "nowrap",
		backgroundColor: colors.white,
	},
	likeTouchable: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15,
	},
	removeLikeButton: {
		backgroundColor: colors.creamRed,
		padding: 3,
		borderRadius: 5,
	},
	likedImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
		marginRight: 15,
	},
	name: {
		fontSize: 18,
		flexWrap: "wrap",
		maxWidth: 150,
		textAlign: "left",
		fontFamily: "Cabin_400Regular",
	},
	superLike: {
		backgroundColor: colors.blue,
		padding: 3,
		borderRadius: 20,

		marginRight: 5,
	},
});
