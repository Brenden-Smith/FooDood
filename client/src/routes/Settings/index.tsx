import {
	View,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	Text,
	StyleSheet,
	ScrollView,
} from "react-native";
import { getAuth, updateEmail } from "firebase/auth";
import { useUserData } from "@/hooks/useUserData";
import { colors } from "@/theme";
import { Formik } from "formik";
import { setDoc } from "firebase/firestore";
import Slider from "@react-native-community/slider";
import { updatePassword } from "firebase/auth";

export function Settings() {
	const user = useUserData();

	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView
				style={{
					height: "100%",
					width: "100%",
				}}
			>
				<Formik
					initialValues={{
						email: user.data?.data()?.email,
						password: undefined,
						confirmPassword: undefined,
					}}
					onSubmit={(values) => {
						const promises = [];
						promises.push(
							setDoc(
								user.data?.ref!,
								{
									email: values.email,
								},
								{ merge: true },
							),
						);
						if (values.password) {
							promises.push(
								updatePassword(
									getAuth().currentUser!,
									values.password,
								),
							);
						}
						if (getAuth().currentUser?.email !== values.email) {
							promises.push(
								updateEmail(
									getAuth().currentUser!,
									values.email,
								),
							);
						}
						return Promise.all(promises);
					}}
					validate={(values) => {
						let errors: any = {};
						if (!values.email) {
							errors.email = "This field is required";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
								values.email,
							)
						) {
							errors.email = "Invalid email address";
						}
						if (values.password !== values.confirmPassword) {
							errors.password = "Passwords do not match";
						}
						return errors;
					}}
					enableReinitialize
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						touched,
					}) => (
						<View style={styles.container}>
							<Text style={styles.title}>Account</Text>

							<View style={styles.accountContainer}>
								<View style={styles.accountSetting}>
									<TextInput
										placeholder={user.data?.data()?.email}
										style={styles.accountInput}
										value={values.email}
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
									/>
								</View>
								{errors.email && touched.email ? (
									<Text
										style={{
											color: "red",
											fontFamily: "Cabin_400Regular",
											marginBottom: 15,
										}}
									>
										{errors.email.toString()}
									</Text>
								) : null}

								<View style={styles.accountSetting}>
									<TextInput
										placeholder="Enter New Password"
										style={styles.accountInput}
										value={values.password}
										onChangeText={handleChange("password")}
										onBlur={handleBlur("password")}
										secureTextEntry
									/>
								</View>
								<View style={styles.accountSetting}>
									<TextInput
										placeholder="Confirm New Password"
										style={styles.accountInput}
										value={values.confirmPassword}
										onChangeText={handleChange(
											"confirmPassword",
										)}
										onBlur={handleBlur("confirmPassword")}
										secureTextEntry
									/>
								</View>
								{errors.password && touched.password ? (
									<Text
										style={{
											color: "red",
											fontFamily: "Cabin_400Regular",
											marginBottom: 15,
										}}
									>
										{errors.password.toString()}
									</Text>
								) : null}

								<TouchableOpacity
									style={[
										styles.logoutBtn,
										{
											backgroundColor:
												!!errors.email ||
												!!errors.password ||
												(values.email ===
													user.data?.data()?.email &&
													(!values.password ||
														!values.confirmPassword))
													? colors.gray
													: colors.creamOrange,
										},
									]}
									onPress={() => handleSubmit()}
									disabled={
										!!errors.email ||
										!!errors.password ||
										(values.email ===
											user.data?.data()?.email &&
											(!values.password ||
												!values.confirmPassword))
									}
								>
									<Text
										style={{
											fontFamily: "Cabin_600SemiBold",
											color:
												!!errors ||
												(values.email ===
													user.data?.data()?.email &&
													(!values.password ||
														!values.confirmPassword))
													? colors.white
													: colors.black,
										}}
									>
										Save
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
				<Formik
					initialValues={{
						searchDistance:
							user.data?.data()?.searchDistance || false,
					}}
					onSubmit={(values) =>
						setDoc(
							user.data?.ref!,
							{
								searchDistance: values.searchDistance,
							},
							{ merge: true },
						)
					}
					enableReinitialize
				>
					{({ handleSubmit, values, setFieldValue }) => (
						<View style={styles.container}>
							<Text style={styles.title}>Options</Text>
							<View style={styles.optionsContainer}>
								<View style={styles.sliderContainer}>
									<Text style={styles.subtitle}>
										Search Distance
									</Text>
									<Slider
										style={{ width: "100%" }}
										minimumValue={1}
										maximumValue={24}
										minimumTrackTintColor={
											colors.creamPurple
										}
										maximumTrackTintColor="grey"
										step={1}
										tapToSeek={true}
										value={values.searchDistance}
										onValueChange={(value: number) => {
											value *= 1609.34;
											setFieldValue(
												"searchDistance",
												value,
											);
										}}
									/>
									<Text style={styles.sliderText}>
										{Math.floor(
											values.searchDistance / 1609.34,
										)}{" "}
										miles
									</Text>
								</View>
								<TouchableOpacity
									style={[
										styles.logoutBtn,
										{
											backgroundColor:
												values.searchDistance ===
												user.data?.data()
													?.searchDistance
													? colors.gray
													: colors.creamOrange,
										},
									]}
									onPress={() => handleSubmit()}
									disabled={
										values.searchDistance ===
										user.data?.data()?.searchDistance
									}
								>
									<Text
										style={{
											fontFamily: "Cabin_600SemiBold",
											color:
												values.searchDistance ===
												user.data?.data()
													?.searchDistance
													? colors.white
													: colors.black,
										}}
									>
										Save
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cream,
		width: "100%",
	},
	container: {
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: colors.creamLight,
		margin: 20,
		paddingVertical: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textDecorationColor: colors.creamPurple,
		marginBottom: 12,
		fontFamily: "Cabin_600SemiBold",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
		textDecorationColor: colors.creamPurple,
		fontFamily: "Cabin_500Medium",
	},
	logoutBtn: {
		backgroundColor: colors.creamOrange,
		borderRadius: 100,
		paddingVertical: 10,
		paddingHorizontal: 64,
		marginBottom: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	toggleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	optionsContainer: {
		width: "100%",
		paddingHorizontal: 32,
	},
	accountContainer: {
		width: "100%",
		paddingHorizontal: 32,
	},
	accountSetting: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	changeBtn: {
		backgroundColor: colors.creamOrange,
		borderRadius: 100,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	accountInput: {
		backgroundColor: "white",
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginRight: 10,
		flex: 1,
		fontFamily: "Cabin_400Regular",
	},
	sliderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	hr: {
		borderBottomColor: "black",
		borderBottomWidth: 1,
		width: "80%",
		marginVertical: 20,
		alignSelf: "center",
	},
	sliderText: {
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 20,
		fontFamily: "Cabin_400Regular",
	},
});
