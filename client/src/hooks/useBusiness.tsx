import { QueryKey } from "@/constants";
import { getFirestore, doc } from "firebase/firestore";
import { useFirestoreDocument } from "./useFirestoreDocument";

export function useBusiness(businessID: string | undefined, enabled?: boolean) {
	return useFirestoreDocument(
		[QueryKey.BUSINESSES, businessID],
		doc(getFirestore(), `businesses/${businessID}`),
		{},
		{
			enabled: !!businessID && enabled,
		},
	);
}
