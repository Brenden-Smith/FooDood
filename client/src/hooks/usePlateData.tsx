import { QueryKey } from "@/constants";
import { getFirestore, doc } from "firebase/firestore";
import { useFirestoreDocument } from "./useFirestoreDocument";

export function usePlateData(plateID: string | undefined, enabled?: boolean) {
	return useFirestoreDocument(
		[QueryKey.PLATES, plateID],
		doc(getFirestore(), `plates/${plateID}`),
		{},
		{
			enabled: !!plateID && enabled,
		},
	);
}
