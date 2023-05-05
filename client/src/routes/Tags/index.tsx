import { SafeAreaView, SectionList } from "react-native";
import { useCallback } from "react";
import { styles } from "./styles";
import Cuisine from "./Cuisine";
import FoodStyles from "./FoodStyles";
import Extra from "./Extra";
import { TagsProvider } from "./TagsContext";

export function Tags() {
	const renderItem = useCallback(
		({ item }: { item: JSX.Element }) => item,
		[],
	);

	return (
		<TagsProvider>
			<SafeAreaView style={styles.pageContainer}>
				<SectionList
					contentContainerStyle={styles.categoriesContainer}
					sections={[
						{
							title: "Cuisine",
							data: [<Cuisine />],
						},
						{
							title: "Food Styles",
							data: [<FoodStyles />],
						},
						{
							title: "Extra",
							data: [<Extra />],
						},
					]}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</SafeAreaView>
		</TagsProvider>
	);
}