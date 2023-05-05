import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { colors } from "@/theme";
import { useNavigation } from "@/hooks";

// @ts-ignore
import LogoBig from "@/assets/logo_big.svg";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { StatusBar } from "expo-status-bar";
import { LoadingOverlay } from "@/components";
import Google from "./Google";
import Apple from "./Apple";

WebBrowser.maybeCompleteAuthSession();

export function Login() {
	const navigation = useNavigation();

	// Render front end component
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, { setErrors }) =>
				signInWithEmailAndPassword(
					getAuth(),
					values.email,
					values.password,
				).catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					if (errorCode === "auth/wrong-password") {
						setErrors({ password: "Wrong password." });
					} else {
						setErrors({ password: errorMessage });
					}
				})
			}
			validate={(values) => {
				const errors: any = {};
				if (!values.email) {
					errors.email = "Required";
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
						values.email,
					)
				) {
					errors.email = "Invalid email address";
				}
				return errors;
			}}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
				isSubmitting,
			}) => (
				<SafeAreaView style={styles.pageContainer}>
					<StatusBar style="dark" />
					<LoadingOverlay loading={isSubmitting} />
					<KeyboardAvoidingView
						behavior="padding"
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<LogoBig
							height={200}
							style={{
								color: colors.creamPurple,
							}}
						/>
						<Text style={styles.textTitle}>Login</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={handleChange("email")}
							value={values.email}
							placeholder="E-Mail"
							onBlur={handleBlur("email")}
						/>
						{touched.email && errors.email && (
							<Text style={styles.error}>{errors.email}</Text>
						)}
						<TextInput
							style={styles.textInput}
							onChangeText={handleChange("password")}
							value={values.password}
							placeholder="Password"
							secureTextEntry={true}
							onBlur={handleBlur("password")}
						/>
						{touched.password && errors.password && (
							<Text style={styles.error}>{errors.password}</Text>
						)}
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => handleSubmit()}
						>
							<Text style={styles.textLoginBtn}>Login</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.textNormal}
							onPress={() => navigation.navigate("SignUp")}
						>
							<Text>
								<Text style={styles.textNormal}>
									Don't have an Account?{" "}
								</Text>
								<Text
									style={[styles.textNormal, styles.textLink]}
								>
									Sign Up
								</Text>
							</Text>
						</TouchableOpacity>
						<View style={styles.divider}></View>
						{Platform.OS === "ios" && <Apple />}
						<Google />
					</KeyboardAvoidingView>
				</SafeAreaView>
			)}
		</Formik>
	);
}

const styles = StyleSheet.create({
	error: {
		color: "red",
		fontFamily: "Cabin_400Regular",
	},
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
		fontFamily: "Cabin_700Bold",
	},
	textInput: {
		backgroundColor: colors.creamLight,
		borderRadius: 10,
		width: 300,
		paddingLeft: 12,
		paddingVertical: 10,
		marginVertical: 12,
		fontSize: 20,
		fontFamily: "Cabin_400Regular",
	},
	textNormal: {
		fontSize: 16,
		marginBottom: 10,
		fontFamily: "Cabin_400Regular",
	},
	textLink: {
		textDecorationLine: "underline",
		color: colors.creamPurple,
		fontFamily: "Cabin_400Regular",
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
		fontFamily: "Cabin_400Regular",
	},
	loginBtn: {
		backgroundColor: colors.creamOrange,
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginVertical: 12,
	},
	textLoginBtn: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "Cabin_600SemiBold",
	},
});
