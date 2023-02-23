import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Alert,
	Modal,
	TextInput,
	Switch,
} from "react-native";

import React, { useState, useEffect } from "react";
import {
	getDocs,
	query,
	collection,
	getFirestore,
	where,
	DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";

function Settings(setSettingsOpen: any) {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			{/* create a function which calls the setSettingsOpen function that closes the settings dialogue  */}
			<TouchableOpacity
				onPress={() => {
					setSettingsOpen(false);
				}}
			>
				<Image source={require("../../assets/icons/back.png")} />
			</TouchableOpacity>

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

export default function Likes() {
	const [likes, setLikes] = useState<DocumentData[]>([]);
	const [settingsOpen, setSettingsOpen] = useState(false);
	useEffect(() => {
		const fetchLikes = async () => {
			const likesCollection = collection(getFirestore(), "likes");
			const userLikesQuery = query(
				likesCollection,
				where("customerId", "==", getAuth().currentUser?.uid),
			);
			const likesSnapshot = await getDocs(userLikesQuery);
			const likesData = likesSnapshot.docs.map((doc) => doc.data());
			setLikes(likesData);
		};
		fetchLikes();
	}, []);

	const profilePic = (
		<TouchableOpacity>
			<Image
				style={{
					width: 60,
					height: 60,
					borderRadius: 30,
					marginLeft: 10,
					marginTop: 10,
				}}
				source={{ uri: "https://picsum.photos/200/300" }} // temp photo
			/>
		</TouchableOpacity>
	);

	const settingsButton = (
		<TouchableOpacity onPress={() => setSettingsOpen(!settingsOpen)}>
			<Image
				style={{
					width: 40,
					height: 40,
					borderRadius: 30,
					marginRight: 10,
					marginTop: 10,
				}}
				source={require("../../assets/icons/settings-gear.png")}
			/>
		</TouchableOpacity>
	);
	//   lets create a styles object to center scrollview

	return (
		<View className="flex-1 bg-white items-center justify-center">
			<Modal
				animationType="slide"
				transparent={true}
				visible={settingsOpen}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setSettingsOpen(!settingsOpen);
				}}
			>
				<Settings setSettingsOpen={setSettingsOpen} />
			</Modal>
			<View className="flex-2 bg-white items-center justify-center flex-row justify-between w-full">
				{profilePic}
				<Text className="text-4xl font-bold">Likes</Text>
				{settingsButton}
			</View>
			<ScrollView className="flex-1 rounded w-4/5 py-5 bg-slate-200 my-5">
				<Text className="text-2xl p-2">CustomerID: Plate</Text>
				<View className="grid">
					{likes.map((like, index) => (
						<Text key={index} className="text-xl p-2">
							{like.customerId}: {like.plateId}
						</Text>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
