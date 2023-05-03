import { colors } from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const srcWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: colors.cream,
	},
	categoriesContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	category: {
		display: "flex",
		// flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 10,
		marginTop: 30,
		padding: 10,
		borderRadius: 10,
		backgroundColor: colors.creamLight,
		flexWrap: "nowrap",
	},
	saveButton: {
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginBottom: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 16,
	},
	title: {
		textAlign: "center",
		marginBottom: 12,
	},
});
