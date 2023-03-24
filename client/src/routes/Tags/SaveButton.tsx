import { colors } from "@/constants";
import { memo, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface SaveButtonProps {
    onPress: () => void;
    isSaved: boolean;
}

export default memo(({ onPress, isSaved }: SaveButtonProps) => {

    
    return (
        <View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{isSaved ? "Unsave" : "Save"}</Text>
            </TouchableOpacity>
        </View>

    );
});