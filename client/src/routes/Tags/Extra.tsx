import { SelectableGroup } from "@/components";
import { colors } from "@/constants";
import { memo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useTags } from "./TagsContext";

export default memo(() => {
	const { tags, setTags } = useTags();
	return (
		<View style={styles.category}>
			<Text className="text-2xl p-2">Extra</Text>
			<SelectableGroup
				items={[
					{ title: "Vegan", value: "vegan" },
					{ title: "Vegetarian", value: "vegetarian" },
					{ title: "Gluten Free", value: "gluten_free" },
					{ title: "Halal", value: "halal" },
					{ title: "Kosher", value: "kosher" },
				]}
				numColumns={2}
				scrollEnabled={false}
				values={tags}
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
