import { Plate } from "@/types";
import { memo, useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/theme";
import { PlateDescriptionModal } from "@/components";

export const Card = memo(
	({
		plate,
		liked,
	}: {
		plate: QueryDocumentSnapshot<DocumentData>;
		liked: boolean;
	}) => {
		const [showDescription, setShowDescription] = useState(false);
		const onPress = useCallback(() => setShowDescription(true), []);
		return (
			<>
				<PlateDescriptionModal
					plateID={plate.id}
					visible={showDescription}
					setVisible={setShowDescription}
				/>
				<View style={styles.card}>
					<Image
						source={{ uri: plate.data().image_url }}
						style={styles.cardImage}
					/>
					<Text style={styles.heading}>{plate.data()?.name}</Text>
					<Text style={styles.price}>{plate.data()?.price}</Text>
					<TouchableOpacity
						style={styles.infoBadge}
						onPress={onPress}
					>
						<FontAwesome5 name="info" size={24} color="white" />
					</TouchableOpacity>
					{liked && (
						<View style={styles.likeBadge}>
							<AntDesign name="star" size={24} color="white" />
						</View>
					)}
				</View>
			</>
		);
	},
);

const styles = StyleSheet.create({
	cardImage: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
		flex: 1,
		resizeMode: "cover",
	},
	card: {
		height: "66%",
		borderRadius: 15,
		shadowRadius: 25,
		shadowColor: colors.black,
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 0 },
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		elevation: 5,
	},
	heading: {
		position: "absolute",
		bottom: 30,
		left: 10,
		fontSize: 28,
		lineHeight: 28,
		marginTop: 10,
		marginBottom: 10,
		color: colors.white,
		shadowRadius: 25,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 12,
		padding: 5,
		fontWeight: "700",
		overflow: "visible",
		fontFamily: "Cabin_700Bold",
	},
	price: {
		position: "absolute",
		bottom: 0,
		left: 10,
		color: colors.green,
		marginBottom: 10,
		fontSize: 24,
		lineHeight: 24,
		fontWeight: "500",
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 12,
		overflow: "visible",
		padding: 5,
		fontFamily: "Cabin_500Medium",
	},
	descContainer: {
		position: "absolute",
		backgroundColor: colors.white,
		color: colors.white,
		top: 0,
		width: "100%",
		height: "100%",
		borderRadius: 8,
		overflow: "hidden",
	},
	descText: {
		color: colors.black,
		fontSize: 16,
		fontWeight: "500",
		padding: 30,
		bottom: 0,
	},
	likeBadge: {
		position: "absolute",
		top: 10,
		right: 10,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.gold,
		justifyContent: "center",
		alignItems: "center",
	},
	infoBadge: {
		position: "absolute",
		top: 10,
		left: 10,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.blue,
		justifyContent: "center",
		alignItems: "center",
	},
});
