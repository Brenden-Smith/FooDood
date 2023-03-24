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
					{ title: "Burger", value: "burgers" },
					{ title: "Pizza", value: "pizza" },
					{ title: "Acai Bowl", value: "acaibowls" },
					{ title: "Dessert", value: "desserts" },
					{ title: "Salad", value: "salad" },
					{ title: "Sandwich", value: "sandwiches" },
					{ title: "Wrap", value: "wraps" },
					{ title: "Tacos", value: "tacos" },
					{ title: "Noodles", value: "noodles" },
					{ title: "Rice", value: "riceshop" },
					{ title: "Soup", value: "soup" },
					{ title: "Pasta", value: "pastashops" },
					{ title: "Steak", value: "steak" },
					{ title: "Chicken Wings", value: "chicken_wings" },
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
