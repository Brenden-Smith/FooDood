import { QueryKey } from "@/constants";
import {
	query,
	collection,
	getFirestore,
	where,
	orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFirestoreQuery } from "./useFirestoreQuery";

export function useLikes() {
	return useFirestoreQuery(
		[QueryKey.LIKES, getAuth().currentUser?.uid],
		query(
			collection(getFirestore(), "likes"),
			where("customerId", "==", getAuth().currentUser?.uid),
			where(
				"timestamp",
				">",
				new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
			),
			orderBy("timestamp", "desc"),
		),
		{
			subscribe: true,
		},
		{
			enabled: !!getAuth().currentUser?.uid,
		},
	);
}
