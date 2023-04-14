import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";
import { getFirestore, doc } from "firebase/firestore";

export function usePlateData(plateID: string, enabled?: boolean) {
	return useFirestoreDocument(
		[QueryKey.PLATES, plateID],
		doc(getFirestore(), `plates/${plateID}`),
		{},
		{
			enabled: !!plateID && (enabled ?? true),
		},
	);
}
