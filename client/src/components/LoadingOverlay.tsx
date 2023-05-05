import { colors } from "@/theme";
import { memo } from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

export const LoadingOverlay = memo(({ loading }: { loading: boolean }) => {
	return (
		<Modal visible={loading} transparent animationType="fade">
			<View style={styles.overlay}>
				<ActivityIndicator size="large" color={colors.white} />
			</View>
		</Modal>
	);
});

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
});
