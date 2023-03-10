import { SelectableGroup } from "@/components";
import { colors } from "@/constants";
import { memo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default memo(() => {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	return (
		<View style={styles.category}>
			<Text className="text-2xl p-2">Extra</Text>
			<SelectableGroup
				items={[
					{ title: "Vegan", value: "vegan" },
					{ title: "Vegetarian", value: "vegetarian" },
					{ title: "Gluten Free", value: "gluten free" },
					{ title: "Halal", value: "halal" },
					{ title: "Kosher", value: "kosher" },
					{ title: "Dairy Free", value: "dairy free" },
					{ title: "Nut Free", value: "nut free" },
					{ title: "Egg Free", value: "egg free" },
					{ title: "Soy Free", value: "soy free" },
					{ title: "Peanut Free", value: "peanut free" },
					{
						title: "Seafood Free",
						value: "seafood free",
					},
					{
						title: "Shellfish Free",
						value: "shellfish free",
					},
					{ title: "Sesame Free", value: "sesame free" },
					{ title: "Wheat Free", value: "wheat free" },
					{ title: "Low Sodium", value: "low sodium" },
					{ title: "Low Sugar", value: "low sugar" },
					{ title: "Low Fat", value: "low fat" },
					{ title: "Low Carb", value: "low carb" },
					{ title: "Low Calorie", value: "low calorie" },
					{
						title: "Low Cholesterol",
						value: "low cholesterol",
					},
					{ title: "Low Protein", value: "low protein" },
					{
						title: "Low Saturated Fat",
						value: "low saturated fat",
					},
				]}
				numColumns={2}
				scrollEnabled={false}
				values={selectedTags}
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
