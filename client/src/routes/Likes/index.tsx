import {
	Text,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	View,
	Dimensions
} from "react-native";
import { useCallback } from "react";
import {
	collection,
	DocumentData,
	getFirestore,
	where,
	query,
	QueryDocumentSnapshot,
	deleteDoc,
	getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { colors } from "@/constants";
import { useLikes } from "@/hooks";
import ListItem from "./ListItem";

const srcWidth = Dimensions.get("window").width;

export function Likes() {
	const likes = useLikes();

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
			style={{
				flex: 1,
				backgroundColor: colors.cream,
				alignItems: "center",
				width: "100%",
			}}
		>
			<View
				style={{
					backgroundColor: colors.creamLight,
					borderRadius: 10,
					padding: 10,
					width: srcWidth * 0.9,
					marginVertical: 30,
					marginHorizontal: 20,
				}}
			>
				<FlatList
					data={likes.data?.docs}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					refreshing={likes.isLoading}
					ListEmptyComponent={
						likes.isLoading ? (
							<ActivityIndicator size="large" />
						) : (
							<Text
								style={{
									fontSize: 20,
									fontWeight: "bold",
									marginBottom: 10,
									marginTop: 10,
									textAlign: "center",
								}}
							>
								When you like a plate it will be displayed here
							</Text>
						)
					}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	);
}
