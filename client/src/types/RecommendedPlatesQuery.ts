import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export type RecommendedPlatesQuery = {
	key: any;
} & UseInfiniteQueryResult<QuerySnapshot<DocumentData>, unknown>;
