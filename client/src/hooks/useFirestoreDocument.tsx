import {
	QueryKey,
	UseQueryOptions,
	UseQueryResult,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import { useCallback, useEffect } from "react";

// Observers
const observers: Record<string, boolean> = {};

// Options type
type UseFirestoreDocumentOptions = {
	subscribe?: boolean;
};

/**
 * React Query hook for Firestore documents
 * @param {QueryKey} key The key to use for the query
 * @param {DocumentReference} document The document reference to query
 * @param {UseFirestoreDocumentOptions} options Options for the hook
 * @param {UseQueryOptions<DocumentSnapshot<DocumentData>>} queryOptions Options for the query
 * @returns {UseQueryResult<DocumentSnapshot<DocumentData>>}
 */
export function useFirestoreDocument(
	key: QueryKey,
	document: DocumentReference,
	options?: UseFirestoreDocumentOptions,
	queryOptions?: UseQueryOptions<DocumentSnapshot<DocumentData>>,
): UseQueryResult<DocumentSnapshot<DocumentData>> {
	const queryClient = useQueryClient();

	/**
	 * Subscribe function
	 * @returns {Promise<Unsubscribe>}
	 */
	const subscribe = useCallback(async () => {
		if (observers[key.toString()]) return;
		observers[key.toString()] = true;
		const unsubscribe = onSnapshot(document, (doc) =>
			queryClient.setQueryData(key, doc),
		);
		return () => {
			unsubscribe();
			delete observers[key.toString()];
		};
	}, [document, key, queryClient]);

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
	return useQuery<DocumentSnapshot<DocumentData>>(
		key,
		() => getDoc(document),
		{
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
		},
	);
}
