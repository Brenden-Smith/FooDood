import { View, SafeAreaView, TouchableOpacity, TextInput, Switch, Text, StyleSheet, Dimensions } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useUserData } from "@/hooks/useUserData";
import { useEffect, useState } from "react";
import { colors } from "@/constants/colors"
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { setDoc } from "firebase/firestore"


const scrWidth = Dimensions.get("window").width;

export function Settings() {
	const user = useUserData();
	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView style={{height: '100%'}}>
				<Formik
					// load the initial values of the form from the user's data
					initialValues={{
						email: user.data?.data()?.email,
						password: user.data?.data()?.password,
						darkMode: user.data?.data()?.darkMode,
						notifications: user.data?.data()?.notifications,
						sounds: user.data?.data()?.sounds,
						vibration: user.data?.data()?.vibration,
						lowData: user.data?.data()?.lowData,
					}}
					// when the form is submitted, update the user's data in firebase
					onSubmit={async (values) => {
						await setDoc(user.data?.ref!, values, {merge: true});
					}}
					

				>
					{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
						<>
							<View style={styles.container}>
								<Text style={styles.title}>Account</Text>
								<View style={styles.accountContainer}>
									<View style={styles.accountSetting}>
										{/* create a textfield which loads in the current email */}
										<TextInput
											placeholder={user.data?.data()?.email}
											style={styles.accountInput}
											value={values.email}
											onChangeText={handleChange('email')}
										/>

										<TouchableOpacity 
											style={styles.changeBtn}
											// update the email with the new email in the textfield in firebase
											// onPress={() => updateEmail(getAuth(), email)}
										>
											<Text>C</Text>
										</TouchableOpacity>
									</View>
									
									<View style={styles.accountSetting}>
										{/* create a textfield which loads in the current password */}
										<TextInput
											placeholder="Password"
											style={styles.accountInput}
											value={values.password}
											onChangeText={handleChange('password')}
										/>
										<TouchableOpacity
											style={styles.changeBtn}
											// update the password with the new password in the textfield in firebase
											// onPress={() => updatePassword(getAuth(), password)}
												// onPress={() => setDoc(user.data?.ref, {password}, {merge: true})}
											>
											<Text>C</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<View style={styles.container}>
								<Text style={styles.title}>Options</Text>
								<View style={styles.optionsContainer} >

									<View style={styles.toggleContainer}>
										<Text>Dark Mode</Text>
										<Switch 
										value={values.darkMode}
										// when the switch is toggled, update the darkMode value to the opposite of what it was
										onValueChange={() => setFieldValue("darkMode", !values.darkMode)}

										/>
									</View>


									<View style={styles.toggleContainer}>
										<Text>Notifications</Text>
										<Switch 
										value={values.notifications}
										onValueChange={() => setFieldValue("notifications", !values.notifications)}
										/>
									</View>
									<View style={styles.toggleContainer}>
										<Text>Sounds</Text>
										<Switch
										value={values.sounds}
										onValueChange={() => setFieldValue("sounds", !values.sounds)}
										/>
									</View>
									<View style={styles.toggleContainer}>
										<Text>Vibration</Text>
										<Switch
										value={values.vibration}
										onValueChange={() => setFieldValue("vibration", !values.vibration)}
										/>
									</View>
									<View style={styles.toggleContainer}>
										<Text>Low Data Usage</Text>
										<Switch
										value={values.lowData}
										onValueChange={() => setFieldValue("lowData", !values.lowData)}
										/>
									</View>
									
									{/* create a button which submits the form */}
									<TouchableOpacity style={styles.logoutBtn} onPress={() => handleSubmit()}>
										<Text>Save</Text>
									</TouchableOpacity>

								</View>
							</View>
							<TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(getAuth())}>
								<Text>Logout</Text>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</ScrollView>
		</SafeAreaView >
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cream,
	},
	container: {
		flex: 1,
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: colors.creamLight,
		width: scrWidth * 0.8,
		marginVertical: 20,
		paddingVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		fontColor: colors.creamPurple,
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	optionsContainer: {
		width: '100%',
		paddingHorizontal: 32,
	},
	accountContainer: {
		width: '100%',
		paddingHorizontal: 32,
	},
	accountSetting: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
		paddingVertical:5,
		paddingHorizontal: 10,
		marginRight: 10,
	}
});