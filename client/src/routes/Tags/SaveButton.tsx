import { colors } from "@/theme";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, View, Text } from "react-native";

export default memo(
	({ onPress, disabled }: { onPress?: () => void; disabled?: boolean }) => (
		<View style={styles.button}>
			<TouchableOpacity onPress={onPress} disabled={disabled}>
				<Text
					style={[
						styles.text,
						{
							color: disabled ? "grey" : colors.creamGreen,
						},
					]}
				>
					Save
				</Text>
			</TouchableOpacity>
		</View>
	),
);

const styles = StyleSheet.create({
	button: {
		marginRight: 20,
	},
	text: {
		fontFamily: "Cabin_500Medium",
		fontSize: 16,
	},
});
