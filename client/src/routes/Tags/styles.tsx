import { colors } from "@/constants";
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
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: colors.creamLight,
		width: srcWidth * 0.8,
		marginVertical: 24,
	},
});
