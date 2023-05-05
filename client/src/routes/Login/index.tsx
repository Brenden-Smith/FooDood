import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	Dimensions,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithCredential,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { colors } from "@/theme";
import { useNavigation } from "@/hooks";

WebBrowser.maybeCompleteAuthSession();
const srcWidth = Dimensions.get("window").width;

export function Login() {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId:
			"637872410840-d6ut3b9clpcenh663ssdi8ggk7pf03ac.apps.googleusercontent.com",
		iosClientId:
			"637872410840-5bl5c3d3i10vsblg3esujfb28a4lbebs.apps.googleusercontent.com",
	});

	// Sign into Firebase with the Google credential
	useEffect(() => {
		if (response?.type === "success") {
			signInWithCredential(
				getAuth(),
				GoogleAuthProvider.credential(response.params.id_token),
			);
		}
	}, [response]);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const navigation = useNavigation();

	function validate() {
		if (email === "Username or Email" || password === "Password") {
			setError("Please enter a valid username and password");
			return false;
		} else {
			setError("");
			return true;
		}
	}

	function login() {
		if (validate()) {
			signInWithEmailAndPassword(getAuth(), email, password).catch(
				(error) => {
					setError(error.message);
				},
			);
		}
	}

	function signUp() {
		if (validate()) {
			createUserWithEmailAndPassword(getAuth(), email, password).catch(
				(error) => {
					setError(error.message);
				},
			);
		}
	}
	const Logo = require("@/assets/logo_big.png");
	// Render front end component
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
			<Text style={styles.textTitle}>Login</Text>
			<TextInput
				style={styles.textInput}
				onChangeText={setEmail}
				value={email}
				placeholder="E-Mail"
			/>
			<TextInput
				style={styles.textInput}
				onChangeText={setPassword}
				value={password}
				placeholder="Password"
			/>
			<TouchableOpacity style={styles.loginBtn}>
				<Text style={styles.textLoginBtn}>Login</Text>
			</TouchableOpacity>
			<Text style={[styles.textNormal, styles.textLink]}>
				Need Help Logging In?
			</Text>
			<TouchableOpacity
				style={styles.textNormal}
				onPress={() => navigation.navigate("SignUp")}
			>
				<Text>
					<Text style={styles.textNormal}>
						Don't have an Account{" "}
					</Text>
					<Text style={[styles.textNormal, styles.textLink]}>
						Sign Up
					</Text>
				</Text>
			</TouchableOpacity>
			<View style={styles.divider}></View>
			<TouchableOpacity
				style={styles.loginAlt}
				disabled={!request}
				onPress={() => promptAsync()}
			>
				<Text style={styles.textLoginAlt}>Google</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity style={styles.loginAlt} disabled>
          <Text style={styles.textLoginAlt}>Apple</Text>
        </TouchableOpacity> */}
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
	textLink: {
		textDecorationLine: "underline",
		color: colors.creamPurple,
	},
	divider: {
		width: 300,
		height: 6,
		backgroundColor: colors.creamPurple,
		borderRadius: 10,
		marginBottom: 20,
	},
	loginAlt: {
		backgroundColor: colors.creamLight,
		borderRadius: 10,
		width: 300,
		paddingLeft: 12,
		paddingVertical: 10,
		marginBottom: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	textLoginAlt: {
		fontSize: 20,
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
