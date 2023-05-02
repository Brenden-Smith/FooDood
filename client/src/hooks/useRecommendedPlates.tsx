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
import { useEffect, useMemo } from "react";
import { useUserData } from "./useUserData";

export function useRecommendedPlates(lucky: boolean) {
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

	const queryOrder = useMemo(() => {
		const random = Math.floor(Math.random() * 7);
		switch (random) {
			case 0:
				return orderBy("businessId");
			case 1:
				return orderBy("businessName");
			case 2:
				return orderBy("description");
			case 3:
				return orderBy("image_url");
			case 4:
				return orderBy("name");
			case 5:
				return orderBy("price");
			case 6:
				return orderBy("tags");
			default:
				return orderBy("businessId");
		}
	}, []);

	return useInfiniteQuery(
		[QueryKey.PLATES, platesQuery, businesses.data],
		({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData> }) =>
			getDocs(
				!pageParam
					? query(platesQuery, limit(5))
					: query(
							platesQuery,
							limit(1),
							queryOrder,
							startAfter(pageParam),
					  ),
			),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.docs[lastPage.docs.length - 1];
			},
			enabled: !!businesses.data && !!platesQuery,
		},
	);
}
