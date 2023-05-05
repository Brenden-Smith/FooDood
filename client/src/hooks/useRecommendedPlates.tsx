import { QueryKey } from "@/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useMemo } from "react";
import { useUserData } from "./useUserData";
import { RecommendedPlatesQuery } from "@/types";

export function useRecommendedPlates(lucky: boolean): RecommendedPlatesQuery {
	const getRecommendations = httpsCallable(
		getFunctions(),
		"getRecommendations",
	);
	const user = useUserData();

	// Location query
	const location = useQuery([QueryKey.LOCATION], async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === "granted") {
			const location = await Location.getCurrentPositionAsync();
			return location;
		}
	});

	// Businesses query
	const businesses = useQuery(
		[
			QueryKey.BUSINESSES,
			lucky,
			location.data?.coords.latitude,
			location.data?.coords.longitude,
			...(user.data?.data()?.tags ?? []),
		],
		() =>
			getRecommendations({
				latitude: location.data?.coords.latitude,
				longitude: location.data?.coords.longitude,
				radius: 40000,
				lucky,
			}).then((res) => res.data as any[]),
		{
			enabled:
				!!location.data && !!user.data && !!user.data?.data()?.tags,
		},
	);

	const platesQuery = useMemo(
		() =>
			query(
				collection(getFirestore(), "plates"),
				where(
					"businessId",
					"in",
					businesses.data?.map((b) => b.id) ?? [""],
				),
			),
		[businesses.data],
	);

	const key = useMemo(
		() => [QueryKey.PLATES, platesQuery, businesses.data],
		[platesQuery, businesses.data],
	);

	const plates = useInfiniteQuery(
		key,
		({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData> }) =>
			getDocs(
				!pageParam
					? query(platesQuery, limit(5), orderBy("image_url"))
					: query(platesQuery, limit(1), orderBy("image_url"), startAfter(pageParam)),
			),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.docs[lastPage.docs.length - 1];
			},
			enabled: !!businesses.data && !!platesQuery,
		},
	);

	return {
		key,
		...plates,
	};
}
