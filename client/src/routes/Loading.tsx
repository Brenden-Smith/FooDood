import { colors } from "@/theme";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, View } from "react-native";
// @ts-ignore
import Logo from "@/assets/logo.png";

/**
 * Loading screen
 * @returns {JSX.Element}
 */
export function Loading(): JSX.Element {
	return (
		<View style={styles.root}>
			<Image source={Logo} style={styles.logo} />
			<ActivityIndicator size="large" />
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
		width: 200,
		height: 200,
	},
});
