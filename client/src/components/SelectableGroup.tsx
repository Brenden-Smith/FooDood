import { memo, useCallback, useMemo, useState } from "react";
import {
	FlatList,
	FlatListProps,
	Pressable,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";

type SelectableItem = {
	title: string;
	value: string;
};

/**
 * A group of selectable items
 * @param {SelectableItem[]} items - The items to select from
 * @param {string[]} values - The values of the selected items
 * @param {(values: string[]) => void} onChange - The function to call when the selection changes
 * @param {React.FC<{item: SelectableItem}>} ItemComponent - The component to render for each item
 * @returns {JSX.Element}
 */
export const SelectableGroup = memo(
	({
		items,
		values,
		onChange,
		ItemComponent,
		itemStyle,
		...props
	}: {
		items: SelectableItem[];
		values: string[];
		onChange: (values: string[]) => void;
		ItemComponent: React.FC<{
			item: SelectableItem;
			selected: boolean;
		}>;
		itemStyle?: TouchableOpacityProps["style"];
	} & Partial<FlatListProps<SelectableItem>>) => {
		const Item = useMemo(
			() =>
				({
					item,
					selected,
					onSelect,
				}: {
					item: SelectableItem;
					selected: boolean;
					onSelect: (item: SelectableItem) => void;
				}) => {
					const [value, setValue] = useState(selected);
					const onPress = useCallback(() => {
						setValue(!value);
						setTimeout(() => onSelect(item), 100)
					}, [item]);
					return (
						<TouchableOpacity
							onPress={onPress}
							style={itemStyle}
						>
							<ItemComponent item={item} selected={value} />
						</TouchableOpacity>
					);
				},
			[ItemComponent],
		);

		const renderItem = useCallback(
			({ item }: { item: SelectableItem }) => {
				const selected = values?.includes(item.value);
				return (
					<Item
						item={item}
						selected={selected}
						onSelect={() => {
							if (selected) {
								onChange(
									values?.filter((v) => v !== item.value),
								);
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
				{...props}
				data={items}
				renderItem={renderItem}
				scrollEnabled={false}
				keyExtractor={(item) => item.value}
			/>
		);
	},
);
