import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";
import { colors } from "@/theme";
import { useNavigation } from "@/hooks";

const srcWidth = Dimensions.get("window").width;

export function SignUp() {
	const Logo = require("@/assets/logo_big.png");
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.pageContainer}>
			<Image
				style={{
					width: srcWidth * 0.9,
					height: 200,
					resizeMode: "contain",
				}}
				source={Logo}
			/>
			<Text style={styles.textTitle}>Sign Up</Text>
			<TextInput
				style={styles.textInput}
				// onChangeText={setEmail}
				// value={email}
				placeholder="E-Mail"
			/>
			<TextInput
				style={styles.textInput}
				// onChangeText={setPassword}
				// value={password}
				placeholder="Password"
			/>
			<TextInput
				style={styles.textInput}
				// onChangeText={setPassword}
				// value={password}
				placeholder="Confirm Password"
			/>
			<TouchableOpacity style={styles.loginBtn}>
				<Text style={styles.textLoginBtn}>Register</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={styles.textNormal}>Cancel</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cream,
	},
	textTitle: {
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 24,
		marginTop: 16,
		color: colors.creamPurple,
	},
	textInput: {
		backgroundColor: colors.creamLight,
		borderRadius: 10,
		width: 300,
		paddingLeft: 12,
		paddingVertical: 10,
		marginBottom: 24,
		fontSize: 20,
	},
	textNormal: {
		fontSize: 16,
		marginBottom: 10,
	},
	loginBtn: {
		backgroundColor: colors.creamOrange,
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginBottom: 12,
	},
	textLoginBtn: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
});
