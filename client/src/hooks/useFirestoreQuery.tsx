import {
	QueryKey,
	UseQueryOptions,
	UseQueryResult,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	CollectionReference,
	DocumentData,
	Query,
	QuerySnapshot,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { useCallback, useEffect } from "react";

// Observers
const observers: Record<string, boolean> = {};

// Options type
type UseFirestoreQueryOptions = {
	subscribe?: boolean;
};

/**
 * React Query hook for Firestore querys
 * @param {QueryKey} key The key to use for the query
 * @param {CollectionReference | Query} query The query reference to query
 * @param {UseFirestoreDocumentOptions} options Options for the hook
 * @param {UseQueryOptions<QuerySnapshot<DocumentData>>} queryOptions Options for the query
 * @returns {UseQueryResult<QuerySnapshot<DocumentData>>}
 */
export function useFirestoreQuery(
	key: QueryKey,
	query: CollectionReference | Query,
	options?: UseFirestoreQueryOptions,
	queryOptions?: UseQueryOptions<QuerySnapshot<DocumentData>>,
): UseQueryResult<QuerySnapshot<DocumentData>> {
	const queryClient = useQueryClient();

	/**
	 * Subscribe function
	 * @returns {Promise<Unsubscribe>}
	 */
	const subscribe = useCallback(async () => {
		if (observers[key.toString()]) return;
		observers[key.toString()] = true;
		const unsubscribe = onSnapshot(query, (doc) =>
			queryClient.setQueryData(key, doc),
		);
		return () => {
			unsubscribe();
			delete observers[key.toString()];
		};
	}, [query, key, queryClient]);

	// Tasks to run on mount
	useEffect(() => {
		if (
			options?.subscribe &&
			(!queryOptions || queryOptions.enabled !== false)
		) {
			subscribe();
		}
	}, [options?.subscribe, subscribe, queryOptions]);

	// Return the query
	return useQuery<QuerySnapshot<DocumentData>>(key, () => getDocs(query), {
		...queryOptions,
		refetchOnMount: options?.subscribe
			? false
			: queryOptions?.refetchOnMount,
		refetchOnWindowFocus: options?.subscribe
			? false
			: queryOptions?.refetchOnWindowFocus,
		refetchInterval: options?.subscribe
			? false
			: queryOptions?.refetchInterval,
		refetchOnReconnect: options?.subscribe
			? false
			: queryOptions?.refetchOnReconnect,
	});
}
