import { colors } from "@/theme"
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, View, Text } from "react-native";

export default memo(({ onPress, disabled }: { onPress?: () => void, disabled?: boolean }) => (
	<View style={styles.button}>
		<TouchableOpacity onPress={onPress} disabled={disabled}  style={disabled ? styles.disabledButton : styles.enabledButton} >
			<Text>Save</Text>
		</TouchableOpacity>
	</View>
));

const styles = StyleSheet.create({
	button: {
		marginRight: 20,
	},
	disabledButton: {
		backgroundColor: "grey",
		padding: 10,
		borderRadius: 5,
	},
	enabledButton: {
		backgroundColor: colors.creamGreen,
		padding: 10,
		borderRadius: 5,
	},
});