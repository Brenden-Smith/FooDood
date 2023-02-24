import { memo, useCallback } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

type SelectableItem = {
	title: string;
	value: string;
};

export function SelectableGroup({
	items,
	values,
	onChange,
}: {
	items: SelectableItem[];
	values: string[];
	onChange: (values: string[]) => void;
}) {
	const renderItem = useCallback(
		({ item }: { item: SelectableItem }) => {
			const selected = values.includes(item.value);
			return (
				<Item
					item={item}
					selected={selected}
					onSelect={() => {
						if (selected) {
							onChange(values.filter((v) => v !== item.value));
						} else {
							onChange([...values, item.value]);
						}
					}}
				/>
			);
		},
		[values, onChange],
	);

	return (
		<FlatList
			data={items}
			renderItem={renderItem}
			keyExtractor={(item) => item.value}
		/>
	);
}

const Item = memo(
	({
		item,
		selected,
		onSelect,
	}: {
		item: SelectableItem;
		selected: boolean;
		onSelect: (item: SelectableItem) => void;
	}) => {
		return (
			<TouchableOpacity
				onPress={() => onSelect(item)}
				style={[{ backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }]}
			>
				<Text>{item.title}</Text>
			</TouchableOpacity>
		);
	},
);
