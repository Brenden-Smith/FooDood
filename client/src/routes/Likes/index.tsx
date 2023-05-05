import {
	Text,
	SafeAreaView,
	ActivityIndicator,
	View,
	Dimensions,
	StyleSheet,
} from "react-native";
import { useCallback, useMemo } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { colors } from "@/theme";
import { useLikes } from "@/hooks";
import ListItem from "./ListItem";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";

/**
 * Likes screen
 * @returns {JSX.Element}
 */
export function Likes(): JSX.Element {
	const likes = useLikes();

	const renderItem = useCallback(
		({ item }: { item: QueryDocumentSnapshot<DocumentData> }) => (
			<ListItem item={item} />
		),
		[],
	);

	const ListEmptyComponent = useMemo(
		() =>
			likes.isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<Text style={styles.noLikesText}>
					When you like a plate it will be displayed here
				</Text>
			),
		[likes.isLoading],
	);

	return (
		<SafeAreaView style={styles.root}>
			<StatusBar style="light" />
			<View style={styles.container}>
				<FlashList
					data={likes.data?.docs}
					renderItem={renderItem}
					refreshing={likes.isLoading}
					ListEmptyComponent={ListEmptyComponent}
					showsVerticalScrollIndicator={false}
					estimatedItemSize={110}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.cream,
		alignItems: "center",
		width: "100%",
	},
	container: {
		backgroundColor: colors.creamLight,
		borderRadius: 10,
		padding: 10,
		width: Dimensions.get("window").width - 40,
		height: Dimensions.get("window").height - 200,
		margin: 20,
	},
	noLikesText: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 10,
		textAlign: "center",
		fontFamily: "Cabin_400Regular",
	},
});
