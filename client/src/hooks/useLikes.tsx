import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { QueryKey } from "@/constants";
import { query, collection, getFirestore, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function useLikes() {
  return useFirestoreQuery(
    [QueryKey.LIKES, getAuth().currentUser?.uid],
    query(
      collection(getFirestore(), "likes"),
      where("customerId", "==", getAuth().currentUser?.uid),
    ),
    {},
    {
      enabled: !!getAuth().currentUser?.uid,
    }
  );
}
