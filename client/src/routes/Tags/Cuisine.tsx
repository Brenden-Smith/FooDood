import { SelectableGroup } from "@/components";
import { colors } from "@/constants";
import { memo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { useTags } from "./TagsContext";

export default memo(() => {
	const { setTags, tags } = useTags();
	return (
		<View style={styles.category}>
			<Text className="text-2xl p-2">Cuisine</Text>
			<SelectableGroup
				items={[
					{ title: "Mexican", value: "mexican" },
					{ title: "Indian", value: "indpak" },
					{ title: "Thai", value: "thai" },
					{ title: "American", value: "tradamerican" },
					{ title: "Chinese", value: "chinese" },
					{ title: "Japanese", value: "japanese" },
					{ title: "Greek", value: "greek" },
					{ title: "Latin", value: "latin" },
					{ title: "Korean", value: "korean" },
					{ title: "Cuban", value: "cuban" },
					{ title: "Italian", value: "italian" },
					{ title: "French", value: "french" },
					{ title: "Vietnamese", value: "vietnamese" },
					{
						title: "Mediterranean",
						value: "mediterranean",
					},
					{ title: "Spanish", value: "spanish" },
					{
						title: "Middle Eastern",
						value: "mideastern",
					},
					{ title: "Caribbean", value: "caribbean" },
				]}
				scrollEnabled={false}
				onChange={(values) => setTags(values)}
				values={tags}
				numColumns={2}
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
