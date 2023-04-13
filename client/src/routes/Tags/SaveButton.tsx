import { memo, useCallback, useEffect, useMemo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useTags } from "./TagsContext";
import { useUserData } from "@/hooks";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { colors } from "@/constants";
import { getAuth } from "firebase/auth";

export default memo(() => {
	const { tags } = useTags();
	const user = useUserData();
	const onPress = useCallback(
		() =>
			updateDoc(
				doc(getFirestore(), `users/${getAuth().currentUser?.uid}`),
				{
					tags,
				},
			),
		[tags, getAuth().currentUser?.uid],
	);

	const disabled = useMemo(
		() => JSON.stringify(user.data?.data()?.tags) === JSON.stringify(tags),
		[user.data?.data()?.tags, tags],
    );

	return (
		<View>
			<TouchableOpacity
				style={[
					styles.saveButton,
					{
						backgroundColor: disabled
							? "#C0C0C0"
							: colors.creamOrange,
					},
				]}
				onPress={onPress}
				disabled={disabled}
			>
				<Text
					style={[
						styles.buttonText,
						{
							color: disabled ? "black" : "white",
						},
					]}
				>
					Save
				</Text>
			</TouchableOpacity>
		</View>
	);
});
