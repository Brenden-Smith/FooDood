import { useNavigation } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback } from "react";
import { TouchableOpacity } from "react-native";

export default memo(() => {
	const navigation = useNavigation();
	const onPress = useCallback(() => navigation.goBack(), [navigation]);
	return (
		<TouchableOpacity onPress={onPress}>
			<Ionicons
				name="chevron-back"
				size={30}
				color="white"
				style={{ marginLeft: -5 }}
			/>
		</TouchableOpacity>
	);
});
