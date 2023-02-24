import { View, SafeAreaView, TouchableOpacity, TextInput, Switch, Image, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useUserData } from "@/hooks/useUserData";

export default function Settings() {
	const user = useUserData();
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
						/>

						<TouchableOpacity className="rounded bg-cyan-600 m-4">
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row my-2">
						{/* create a textfield which loads in the current username */}
						<TextInput
							placeholder="Username"
							className="rounded bg-white w-32"
						/>
						<TouchableOpacity className="rounded bg-cyan-600 m-4">
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row my-2">
						{/* create a textfield which loads in the current password */}
						<TextInput
							placeholder="Password"
							className="rounded bg-white w-32"
						/>
						<TouchableOpacity className="rounded bg-cyan-600 m-4">
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