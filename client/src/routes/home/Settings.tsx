import { View, SafeAreaView, TouchableOpacity, TextInput, Switch, Image, Text } from "react-native";
import { getAuth, signOut, updateEmail } from "firebase/auth";
import { useUserData } from "@/hooks/useUserData";
import { useState } from "react";
import { setDoc } from "firebase/firestore"

export default function Settings() {
	const user = useUserData();
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
			<SafeAreaView className="flex-1 items-center justify-center bg-white">
			<View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-500 my-5">
				<Text className="text-2xl p-2">Account</Text>
				<View className="flex flex-col">
					<View className="w-64 flex flex-row my-2">
						{/* create a textfield which loads in the current email */}
						<TextInput
							placeholder={user.data?.data()?.email}
							className="rounded bg-white w-32"
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>

						<TouchableOpacity 
							className="rounded bg-cyan-600 m-4"
							// update the email with the new email in the textfield in firebase
							// onPress={() => updateEmail(getAuth(), email)}
						>
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row my-2">
						{/* create a textfield which loads in the current username */}
						<TextInput
							placeholder="Username"
							className="rounded bg-white w-32"
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
						<TouchableOpacity className="rounded bg-cyan-600 m-4"
							// update the username with the new username in the textfield in firebase
							// onPress={() => setDoc(user.data?.ref, {username}, {merge: true})}
						>
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row my-2">
						{/* create a textfield which loads in the current password */}
						<TextInput
							placeholder="Password"
							className="rounded bg-white w-32"
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity className="rounded bg-cyan-600 m-4"
							// update the password with the new password in the textfield in firebase
							// onPress={() => updatePassword(getAuth(), password)}
								// onPress={() => setDoc(user.data?.ref, {password}, {merge: true})}
							>
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">Privacy</Text>
				<View className="grid">
					<View className="w-16">
						<TouchableOpacity>
							<Text>Tag</Text>
						</TouchableOpacity>
					</View>
					<View className="w-16">
						<TouchableOpacity>
							<Text>Tag</Text>
						</TouchableOpacity>
					</View>
					<View className="w-16">
						<TouchableOpacity>
							<Text>Tag</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<View className="flex flex-row">
					<Text className="text-2xl p-2">Notifications</Text>
					{/* create a switch which toggles the notifications */}
					<Switch disabled={false} />
				</View>
			</View>
			<TouchableOpacity onPress={() => signOut(getAuth())}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView >
	);
}