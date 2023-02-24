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

import { useState, useEffect } from "react";
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
import Settings from "./Settings";


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
					width: 50,
					height: 50,
					borderRadius: 30,
					marginLeft: 20,
					marginTop: 7,
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
					marginRight: 20,
					marginTop: 7.5,
				}}
				source={require("../../assets/icons/settings-gear.png")}
			/>
		</TouchableOpacity>
	);
	//   lets create a styles object to center scrollview

	return (
		// to add safe area view to the top of the screen we need to wrap the view in a safe area view
		<SafeAreaView className="flex-1 bg-white">
			<View className="items-center justify-center">
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
				<View className="items-center justify-center flex-row justify-between w-full">
					{profilePic}
					<Text className="text-4xl font-bold">Likes</Text>
					{settingsButton}
				</View>

				<ScrollView className="rounded w-4/5 py-5 bg-slate-200 my-5">
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
		</SafeAreaView>
	);
}
