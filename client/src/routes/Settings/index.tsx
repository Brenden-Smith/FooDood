import { View, SafeAreaView, TouchableOpacity, TextInput, Switch, Text, StyleSheet, Dimensions } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import { colors } from "@/constants/colors"
import { ScrollView } from 'react-native-gesture-handler';


const scrWidth = Dimensions.get("window").width;

export function Settings() {
	const user = useUserData();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [notifications, setNotifications] = useState<boolean>(false);
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [sounds, setSounds] = useState<boolean>(false);
	const [vibration, setVibration] = useState<boolean>(false);
	const [lowData, setLowData] = useState<boolean>(false);

	return (
		<SafeAreaView style={styles.pageContainer}>
			<ScrollView style={{height: '100%'}}>
				<View style={styles.container}>
					<Text style={styles.title}>Account</Text>
					<View style={styles.accountContainer}>
						<View style={styles.accountSetting}>
							{/* create a textfield which loads in the current email */}
							<TextInput
								placeholder={user.data?.data()?.email}
								style={styles.accountInput}
								value={email}
								onChangeText={(text) => setEmail(text)}
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
								value={password}
								onChangeText={(text) => setPassword(text)}
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
							<Switch disabled={false}
							value={darkMode}
							onValueChange={() => setDarkMode(!darkMode)}
							/>
						</View>


						<View style={styles.toggleContainer}>
							<Text>Notifications</Text>
							<Switch disabled={false}
							value={notifications}
							onValueChange={() => setNotifications(!notifications)}
							/>
						</View>
						<View style={styles.toggleContainer}>
							<Text>Sounds</Text>
							<Switch disabled={false}
							value={sounds}
							onValueChange={() => setSounds(!sounds)}
							/>
						</View>
						<View style={styles.toggleContainer}>
							<Text>Vibration</Text>
							<Switch disabled={false} 
							value={vibration}
							onValueChange={() => setVibration(!vibration)}
							/>
						</View>
						<View style={styles.toggleContainer}>
							<Text>Low Data Usage</Text>
							<Switch disabled={false}
							value={lowData}
							onValueChange={() => setLowData(!lowData)}
							/>
						</View>
						
					</View>
				</View>
				<TouchableOpacity style={styles.logoutBtn} onPress={() => signOut(getAuth())}>
					<Text>Logout</Text>
				</TouchableOpacity>
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