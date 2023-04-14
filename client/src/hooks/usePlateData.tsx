import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";
import { getFirestore, doc } from "firebase/firestore";

export function usePlateData(plateID: string, enabled?: boolean) {
    console.log("usePlateData: ", plateID);
	return useFirestoreDocument(
		[QueryKey.PLATES, plateID],
		doc(getFirestore(), `plates/${plateID}`),
		
	);
}
