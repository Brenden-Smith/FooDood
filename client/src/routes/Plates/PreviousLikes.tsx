import { useLikes } from "@/hooks";
import {
	doc,
	DocumentData,
	getDoc,
	getFirestore,
	DocumentSnapshot,
} from "firebase/firestore";
import { memo, useCallback, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme";
import { PlateDescriptionModal } from "@/components";
import { text } from "@/theme";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

export default memo(
	({
		visible,
		setVisible,
	}: {
		visible: boolean;
		setVisible: (visible: boolean) => void;
	}) => {
		const likes = useLikes();
		const plates = useQuery(
			[
				"previousLikes",
				likes.data?.docs.slice(0, Math.min(likes.data?.docs.length, 4)),
			],
			() =>
				Promise.all(
					likes.data?.docs
						.slice(0, Math.min(likes.data?.docs.length, 4))
						.map((like) =>
							getDoc(
								doc(
									getFirestore(),
									"plates",
									like.data().plateId,
								),
							),
						) ?? [],
				),
			{
				enabled: !!likes.data?.docs && visible,
			},
		);

		const renderItem = useCallback(
			({ item }: { item: DocumentSnapshot<DocumentData> }) => (
				<PreviousLike item={item} />
			),
			[],
		);

		return (
			<Modal visible={visible} transparent={true} animationType="fade">
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
								width: 300,
							}}
						>
							<FlashList
								data={plates.data}
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
						setVisible={setDescriptionModalVisible}
					/>
				</View>
			</TouchableOpacity>
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
		padding: 20,
		backgroundColor: colors.creamLight,
	},
	title: {
		textAlign: "center",
		marginBottom: 12,
		fontFamily: "Cabin_700Bold",
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
		fontFamily: "Cabin_600SemiBold",
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
		fontFamily: "Cabin_700Bold",
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
		fontFamily: "Cabin_700Bold",
	},
	cardImage: {
		width: "100%",
		height: "100%",
		borderRadius: 15,
	},
	card: {
		flex: 1,
		// flexDirection: "column",
		height: 160,
		width: 141,
		backgroundColor: colors.white,
		borderRadius: 15,
		marginBottom: 10,
		marginLeft: 5,
		justifyContent: "center",
		alignItems: "center",
	},
});
