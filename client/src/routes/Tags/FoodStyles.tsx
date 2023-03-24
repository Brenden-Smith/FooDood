import { SelectableGroup } from "@/components";
import { colors } from "@/constants";
import { memo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default memo(() => {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	return (
		<View style={styles.category}>
			<Text className="text-2xl p-2">Styles</Text>
			<SelectableGroup
				items={[
					{ title: "Burger", value: "burger" },
					{ title: "Pizza", value: "pizza" },
					{ title: "Bowl", value: "bowl" },
					{ title: "Plate", value: "plate" },
					{ title: "Burrito", value: "burrito" },
					{ title: "Dessert", value: "dessert" },
					{ title: "Salad", value: "salad" },
					{ title: "Sandwich", value: "sandwich" },
					{ title: "Wrap", value: "wrap" },
					{ title: "Fries", value: "fries" },
					{ title: "Tacos", value: "tacos" },
					{ title: "Noodles", value: "noodles" },
					{ title: "Rice", value: "rice" },
					{ title: "Soup", value: "soup" },
					{ title: "Pasta", value: "pasta" },
					{ title: "Steak", value: "steak" },
					{ title: "Chicken", value: "chicken" },
				]}
				scrollEnabled={false}
				values={selectedTags}
				numColumns={2}
				onChange={(values) => setSelectedTags(values)}
				ItemComponent={({ item, selected }) => (
					<View
						style={{
							backgroundColor: selected
								? colors.creamOrange
								: "white",
							alignItems: "center",
							padding: 8,
							borderRadius: 5,
							marginHorizontal: 5,
							width: "100%",
						}}
					>
						<Text
							style={{
								color: selected ? "white" : "black",
							}}
						>
							{item.title}
						</Text>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
				itemStyle={{
					height: 50,
					width: 150,
					marginHorizontal: 5,
				}}
			/>
		</View>
	);
});
