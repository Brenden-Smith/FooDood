import { memo } from "react";
import { StyleSheet } from "react-native";
import { Button, View } from "react-native";

export default memo(({ onPress, disabled }: { onPress?: () => void, disabled?: boolean }) => (
	<View style={styles.button}>
		<Button title="Save" onPress={onPress} disabled={disabled} color="white"/>
	</View>
));

const styles = StyleSheet.create({
	button: {
		marginRight: 20,
	},
});