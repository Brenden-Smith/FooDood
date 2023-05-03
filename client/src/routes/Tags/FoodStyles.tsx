import { SelectableGroup } from "@/components";
import { colors } from "@/theme";
import { memo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useTags } from "./TagsContext";
import { text } from "@/theme";

export default memo(() => {
	const { tags, setTags } = useTags();
	return (
		<View style={styles.category}>
			<Text style={[text.h3, styles.title]}>Styles</Text>
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
				values={tags}
				numColumns={2}
				onChange={(values) => setTags(values)}
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
