import { QueryKey } from "@/constants";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import { useFirestoreDocument } from "./useFirestoreDocument";

export function useUserData() {
	return useFirestoreDocument(
		[QueryKey.USER_DATA, getAuth().currentUser?.uid],
		doc(getFirestore(), `users/${getAuth().currentUser?.uid}`),
		{
			subscribe: true,
		},
		{
			enabled: !!getAuth().currentUser?.uid,
		},
	);
}
