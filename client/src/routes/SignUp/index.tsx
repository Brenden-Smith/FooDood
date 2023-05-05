import {
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { colors } from "@/theme";
import { useNavigation } from "@/hooks";
// @ts-ignore
import LogoBig from "@/assets/logo_big.svg";
import { Formik } from "formik";
import { LoadingOverlay } from "@/components";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

export function SignUp() {
	const navigation = useNavigation();
	return (
		<Formik
			initialValues={{ email: "", password: "", confirmPassword: "" }}
			onSubmit={(values, { setErrors }) =>
				createUserWithEmailAndPassword(
					getAuth(),
					values.email,
					values.password,
				).catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					if (errorCode === "auth/weak-password") {
						setErrors({ password: "The password is too weak." });
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
				if (!values.password) {
					errors.password = "Required";
				} else if (values.password.length < 6) {
					errors.password = "Password must be at least 6 characters";
				} else if (values.password !== values.confirmPassword) {
					errors.password = "Passwords do not match";
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
						<Text style={styles.textTitle}>Sign Up</Text>

						<TextInput
							style={styles.textInput}
							placeholder="Email"
							value={values.email}
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
						/>
						{touched.email && errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
						<TextInput
							style={styles.textInput}
							placeholder="Password"
							value={values.password}
							onChangeText={handleChange("password")}
							onBlur={handleBlur("password")}
							secureTextEntry
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Confirm Password"
							value={values.confirmPassword}
							onChangeText={handleChange("confirmPassword")}
							onBlur={handleBlur("confirmPassword")}
							secureTextEntry
						/>
						{touched.password && errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => handleSubmit()}
						>
							<Text style={styles.textLoginBtn}>Register</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Text style={styles.textNormal}>Cancel</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			)}
		</Formik>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cream,
	},
	errorText: {
		color: "red",
		fontFamily: "Cabin_400Regular",
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
	loginBtn: {
		backgroundColor: colors.creamOrange,
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginVertical: 32,
	},
	textLoginBtn: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		fontFamily: "Cabin_600SemiBold",
	},
});
