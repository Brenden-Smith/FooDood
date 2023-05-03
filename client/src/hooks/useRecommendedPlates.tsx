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
import { useCallback, useEffect, useMemo } from "react";
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

	const randomQueryOrder = useCallback(() => {
		const r1 = Math.floor(Math.random() * 6);
		let field = "businessName";
		switch (r1) {
			case 0:
				field = "businessName";
				break;
			case 1:
				field = "description";
				break;
			case 2:
				field = "image_url";
				break;
			case 3:
				field = "name";
				break;
			case 4:
				field = "price";
				break;
			case 5:
				field = "tags";
				break;
			default:
				field = "businessName";
				break;
		}
		const r2 = Math.floor(Math.random() * 2);
		return orderBy(field, r2 === 0 ? "asc" : "desc");
	}, []);

	return useInfiniteQuery(
		[QueryKey.PLATES, platesQuery, businesses.data],
		({ pageParam }: { pageParam?: QueryDocumentSnapshot<DocumentData> }) =>
			getDocs(
				!pageParam
					? query(platesQuery, randomQueryOrder(), limit(5))
					: query(
							platesQuery,
							limit(1),
							randomQueryOrder(),
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
