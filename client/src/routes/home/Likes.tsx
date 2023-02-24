import { Text, SafeAreaView, FlatList } from "react-native";
import { memo, useCallback } from "react";
import {
	collection,
	DocumentData,
	getFirestore,
	where,
	query,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";

export default function Likes() {
	const likes = useFirestoreQuery(
		[QueryKey.LIKES, getAuth().currentUser?.uid],
		query(
			collection(getFirestore(), "likes"),
			where("customerId", "==", getAuth().currentUser?.uid),
		),
		{},
		{
			enabled: !!getAuth().currentUser?.uid,
		},
	);

	const renderItem = useCallback(
		({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => (
			<ListItem item={item} />
		),
		[],
	);

	return (
		<SafeAreaView className="flex-1 bg-white justify-center items-center">
			<FlatList
				ListHeaderComponent={
					<Text className="text-2xl p-2">CustomerID: Plate</Text>
				}
				data={likes.data?.docs}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				className="rounded w-4/5 py-5 bg-slate-200 my-5"
			/>
		</SafeAreaView>
	);
}

const ListItem = memo(
	({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => {
		return (
			<Text className="text-xl p-2">
				{item.data().customerId}: {item.data().plateId}
			</Text>
		);
	},
);
