import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Image,
	SafeAreaView,
	TextInput,
	Switch,
	Modal,
	Alert,
} from "react-native";
import React, { useState } from "react";

interface SettingsProps {
	setSettingsOpen: (value: boolean) => void;
}

function Settings(props: SettingsProps) {
	const { setSettingsOpen } = props;
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<SafeAreaView>
				{/* create a function which calls the setSettingsOpen function that closes the settings dialogue  */}
				<TouchableOpacity
					onPress={() => {
						setSettingsOpen(false);
					}}
				>
					<Image source={require("../../assets/icons/back.png")} />
				</TouchableOpacity>
			</SafeAreaView>
			<Text className="mb-5 text-3xl font-bold">Settings</Text>
			<View className="flex-1 items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">Account</Text>
				<View className="grid">
					<View className="w-64 flex flex-row">
						{/* create a textfield which loads in the current email */}
						<TextInput
							placeholder="Email"
							className="rounded bg-white w-32"
						/>

						<TouchableOpacity className="rounded bg-cyan-600">
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row">
						{/* create a textfield which loads in the current username */}
						<TextInput
							placeholder="Username"
							className="rounded bg-white w-32"
						/>
						<TouchableOpacity className="rounded bg-cyan-600">
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
					<View className="w-64 flex flex-row">
						{/* create a textfield which loads in the current password */}
						<TextInput
							placeholder="Password"
							className="rounded bg-white w-32"
						/>
						<TouchableOpacity className="rounded bg-cyan-600">
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
		</View>
	);
}

export default function Tags() {
	return (
		<SafeAreaView className="flex-1 bg-white items-center justify-center">
			<View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">Cuisine</Text>
				<View className="grid">
					<View className="w-16">
						<Button title="Tag" />
					</View>
					<View className="w-16">
						<Button title="Tag" />
					</View>
					<View className="w-16">
						<Button title="Tag" />
					</View>
				</View>
			</View>
			<View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">Styles</Text>
				<View className="grid">
					<View className="w-16">
						<Button title="Tag" />
					</View>
					<View className="w-16">
						<Button title="Tag" />
					</View>
					<View className="w-16">
						<Button title="Tag" />
					</View>
				</View>
			</View>
			<View className="items-center rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">Extra</Text>
				<View className="grid">
					<View className="w-16">
						<Button title="Tag" />
					</View>
					<View className="w-16">
						<Button title="Tag" />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
