import {
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
	FlatList,
	StyleSheet,
	Image,
} from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import {
	collection,
	DocumentData,
	getFirestore,
	where,
	query,
	QueryDocumentSnapshot,
	deleteDoc,
	getDocs,
	doc,
	DocumentReference,
	onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { colors, QueryKey } from "@/constants";
import {likesStyles} from "./styles";
import { styles } from "@/routes/Plates/styles"
import { HoldItem } from "react-native-hold-menu"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';




export default function Likes() {
	const [likedPlates, setLikedPlates] = useState<
		QueryDocumentSnapshot<DocumentData>[]
	>([]);
	const likesQuery = query(
		collection(getFirestore(), "likes"),
		where("customerId", "==", getAuth().currentUser?.uid),
	);

	useEffect(() => {
		const unsubscribe = onSnapshot(likesQuery, (snapshot) => {
			const newLikedPlates: QueryDocumentSnapshot<DocumentData>[] = [];
			snapshot.docs.forEach((doc) => {
				newLikedPlates.push(doc);
			});
			setLikedPlates(newLikedPlates);
		});

		return unsubscribe;
	}, []);

	const removeLikedPlate = useCallback(async (plateId: any) => {
		const likedPlateQuery = query(
			collection(getFirestore(), "likes"),
			where("customerId", "==", getAuth().currentUser?.uid),
			where("plateId", "==", plateId),
		);
		const likedPlateDocs = await getDocs(likedPlateQuery);
		likedPlateDocs.forEach(async (doc: any) => {
			await deleteDoc(doc.ref);
		});
	}, []);

	const renderItem = useCallback(
		({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => (
			<ListItem item={item} removeLikedPlate={removeLikedPlate} />
		),
		[removeLikedPlate],
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: colors.cream, alignItems: "center" }}
		>
			<View
				style={{
					width: "85%",
					backgroundColor: colors.creamLight,
					borderRadius: 10,
					padding: 10,
					marginTop: 30,
				}}
			>
				{likedPlates.length > 0 ? (
					<>
						{/* <Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 10,
								marginTop: 10,
							}}
						>
							CustomerID: Plate
						</Text> */}
						<FlatList
							data={likedPlates}
							keyExtractor={(item) => item.id}
							renderItem={renderItem}
						/>
					</>
				) : (
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							marginBottom: 10,
							marginTop: 10,
						}}
					>
						When you like a plate it will be displayed here
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
}



const ListItem = memo(
	({
		item,
		removeLikedPlate,
	}: {
		item: QueryDocumentSnapshot<DocumentData>;
		removeLikedPlate: Function;
	}) => {


		const MenuItems = [
		{ text: 'Actions', isTitle: true },
		{ text: 'Super Like', icon: () => <AntDesign name="heart" size={24} color="black" />, onPress: () => {} },
	{ text: 'Info', icon: () => <Ionicons name="information-circle-outline" size={24} color="black" />, onPress: () => {} },
	{ text: 'Delete', icon: () => <AntDesign name="delete" size={24} color="black" />, onPress: () => {removeLikedPlate(item.data().plateId)} },
]
		return (
			<HoldItem
				items={MenuItems}
			>
				<View
					style={likesStyles.likeContainer}
				>
					<Image
						source={{ uri: item.data().image_url }}
						style={likesStyles.likedImage}
					/>
					<Text style={{ fontSize: 18 }}>
						{item.data().name}
					</Text>
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


