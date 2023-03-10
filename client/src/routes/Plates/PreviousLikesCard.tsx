import { useLikes } from "@/hooks";
import { memo } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";

export default memo(() => {
	const likes = useLikes();
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
					data={likes.data?.docs.splice(0, 4)}
					renderItem={({ item }) => (
						<View
							className="flex flex-row justify-center items-center rounded bg-slate-300 m-3"
							style={{
								height: 150,
								width: 150,
							}}
						>
							{/* <Image
                source={{ uri: like.data()?.image }}
                style={{ width: 100, height: 100 }}
              /> */}
							<Text className="text-lg text-gray-900">
								{item.data().plateId}
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
