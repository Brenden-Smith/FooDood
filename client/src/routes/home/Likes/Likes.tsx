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
import { QueryKey } from "@/constants";
import {likesStyles} from "./styles";
import { styles } from "@/routes/Plates/styles"

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
			style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
		>
			<View
				style={{
					width: "85%",
					backgroundColor: "lightgrey",
					borderRadius: 10,
					padding: 10,
					marginTop: 30,
				}}
			>
				{likedPlates.length > 0 ? (
					<>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 10,
								marginTop: 10,
							}}
						>
							CustomerID: Plate
						</Text>
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
		return (
			<View
				style={likesStyles.likeContainer}
			>
				{/* <Image
					source={item.data().image_url}
					style={likesStyles.likedImage}
				/> */}
				<Text style={{ fontSize: 18 }}>
					{item.data().plateId}
				</Text>
				<TouchableOpacity
					onPress={() => removeLikedPlate(item.data().plateId)}
					style={likesStyles.removeLikeButton}
				>
					<Text style={{ color: "white", fontSize: 12 }}>Remove</Text>
				</TouchableOpacity>
			</View>
		);
	},
);


