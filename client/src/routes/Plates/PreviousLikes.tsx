import { useLikes } from "@/hooks";
import {
	doc,
	DocumentData,
	getDoc,
	getFirestore,
	DocumentSnapshot,
} from "firebase/firestore";
import { memo, useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants";
import { PlateDescriptionModal } from "@/components";
import { text } from "@/theme";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

export default memo(
	({
		visible,
		setVisible,
	}: {
		visible: boolean;
		setVisible: (visible: boolean) => void;
	}) => {
		const [plates, setPlates] = useState<DocumentSnapshot<DocumentData>[]>(
			[],
		);

		const likes = useLikes();
		useEffect(() => {
			async function getPlates() {
				const plateIds =
					likes.data?.docs
						?.splice(0, 4)
						.map((doc) => doc.data().plateId) ?? [];
				const plateDocs = await Promise.all(
					plateIds.map((id: string) =>
						getDoc(doc(getFirestore(), "plates", id)),
					),
				);
				setPlates(plateDocs);
			}
			getPlates();
		}, [likes.data?.docs]);

		const renderItem = useCallback(
			({ item }: { item: DocumentSnapshot<DocumentData> }) => (
				<PreviousLike item={item} />
			),
			[],
		);

		return (
			<Modal visible={visible} transparent={true}>
				<View style={styles.modalInner}>
					<View style={styles.container}>
						<View>
							<Text style={[text.h3, styles.title]}>
								Previous Likes
							</Text>
							<Text style={[text.p, styles.description]}>
								These are some of the plates you liked in the
								past! Choose from the following plates to order
								online!
							</Text>
						</View>
						<View
							style={{
								height: 350,
								width: 350,
							}}
						>
							<FlashList
								data={plates}
								renderItem={renderItem}
								numColumns={2}
								scrollEnabled={false}
								estimatedItemSize={158}
							/>
						</View>

						<TouchableOpacity
							style={styles.okButton}
							onPress={() => setVisible(false)}
						>
							<Text style={styles.buttonText}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	},
);

const PreviousLike = memo(
	({ item }: { item: DocumentSnapshot<DocumentData> }) => {
		const [descriptionModalVisible, setDescriptionModalVisible] =
			useState(false);
		return (
			<TouchableOpacity
				onPress={() => {
					setDescriptionModalVisible(true);
				}}
			>
				<View style={styles.card}>
					<Image
						source={{
							uri: item.data()?.image_url,
						}}
						style={styles.cardImage}
						contentFit="cover"
					/>

					<Text style={styles.price}>{item.data()?.price}</Text>
					<Text style={styles.heading}>{item.data()?.name}</Text>
					<PlateDescriptionModal
						visible={descriptionModalVisible}
						plateID={item.id}
						onDismiss={() => {
							setDescriptionModalVisible(false);
						}}
					/>
				</View>
			</TouchableOpacity>
		);
	},
);

const styles = StyleSheet.create({
	modalInner: {
		display: "flex",
		flexDirection: "column",
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
		height: "66%",
		borderRadius: 15,
		shadowRadius: 25,
		shadowColor: colors.black,
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 0 },
		alignItems: "center",
		elevation: 5,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		padding: 20,
		backgroundColor: colors.creamLight,
	},
	title: {
		textAlign: "center",
		marginBottom: 12,
	},
	description: {
		textAlign: "center",
		marginBottom: 12,
	},
	okButton: {
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginBottom: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.creamOrange,
	},
	buttonText: {
		fontSize: 16,
		color: "white",
	},
	heading: {
		position: "absolute",
		lineHeight: 28,
		color: colors.white,
		shadowRadius: 25,
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 12,
		padding: 5,
		fontWeight: "700",
		overflow: "visible",
		fontSize: 16,
		paddingTop: 0,
		top: 0,
		bottom: "auto",
		marginTop: 0,
		left: 0,
		marginBottom: 0,
	},
	price: {
		position: "absolute",
		bottom: 0,
		color: colors.green,
		lineHeight: 24,
		fontWeight: "500",
		textShadowColor: "rgba(0, 0, 0, 0.8)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 12,
		overflow: "visible",
		padding: 5,
		fontSize: 16,
		paddingRight: 5,
		right: 0,
		left: "auto",
		marginBottom: 0,
		paddingBottom: 0,
	},
	cardImage: {
		width: "100%",
		height: "100%",
		backgroundColor: "#FFFFFF",
		overflow: "hidden",
		flex: 1,
		opacity: 0.8,
		borderRadius: 15,
	},
	card: {
		display: "flex",
		flexDirection: "column",
		height: 150,
		width: 150,
		backgroundColor: colors.black,
		borderRadius: 15,
		margin: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
