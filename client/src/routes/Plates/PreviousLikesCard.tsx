import { useLikes } from "@/hooks";
import { Plate } from "@/types"
import { doc, DocumentData, getDoc, getFirestore, DocumentSnapshot } from "firebase/firestore"
import { memo, useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { styles } from "./styles";




export default memo(() => {

	const [plates, setPlates] = useState<DocumentSnapshot<DocumentData>[]>([]);
	

	const likes = useLikes();
	useEffect(() => {
	async function getPlates() {
		
		const plateIds = likes.data?.docs?.splice(0,4).map((doc) => doc.data().plateId) ?? [];
		const plateDocs = await Promise.all(plateIds.map((id: string) => getDoc(doc(getFirestore(), "plates", id))));
		setPlates(plateDocs);
	}
	getPlates();
}, [likes.data?.docs]);

	return (
		<View
			style={[
				styles.card,
				{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					padding: 20,
				},
			]}
		>
			<View className="flex flex-col space-y-5 items-center mt-5">
				<Text className="text-2xl font-bold">Previous Likes</Text>
				{/* previous likes descripton */}
				<Text className="text-md">
					These are some of the plates you liked in the past! Choose
					from the following plates to order online!
				</Text>
			</View>
			<View className="flex flex-row flex-wrap justify-center items-center">
				<FlatList
					// limit the number of items shown in the flatlist to 5
					data={plates}
					renderItem={({ item }) => (
						<View
							className="flex flex-col justify-center items-center rounded bg-slate-300 m-3"
							style={{
								height: 150,
								width: 150,
							}}
						>
							<Image
								source={{
									uri: item.data()?.image_url,
								}}
								style={{
									height: 50,
									width: 50,
									borderRadius: 10
								}}
							/>
							<Text className="text-sm text-gray-900">
								{item.data()?.price}
							</Text>
							<Text className="text-md text-gray-900">
								{item.data()?.name}
							</Text>
							
						</View>
					)}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ alignItems: "center" }}
					numColumns={2}
				/>

				<Text className="text-md">
					Or swipe to the right or left to see more plates!
				</Text>
			</View>
		</View>
	);
});
