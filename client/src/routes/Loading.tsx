import { colors } from "@/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";
// @ts-ignore
import Logo from "@/assets/logo.svg";
import { StatusBar } from "expo-status-bar";

/**
 * Loading screen
 * @returns {JSX.Element}
 */
export function Loading(): JSX.Element {
	return (
		<View style={styles.root}>
			<StatusBar style="dark" />
			<Logo height={200} style={styles.logo} />
			<ActivityIndicator size="large" color={colors.creamPurple} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cream,
	},
	logo: {
		color: colors.creamPurple,
	},
});
