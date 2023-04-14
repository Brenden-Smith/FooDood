import { useFirestoreDocument, useFirestoreQuery } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";
import {
	query,
	collection,
	getFirestore,
	where,
	orderBy,
    doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";


export function usePlateData(plateID: string) {
    return useFirestoreDocument(
        [QueryKey.PLATES, plateID],
        doc(getFirestore(), `plates/${plateID}`),
        {
            subscribe: true,
        },
        {
            enabled: !!plateID,
        },
    );
}
