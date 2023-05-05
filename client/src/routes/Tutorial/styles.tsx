import { colors } from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const srcWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
	tutorialContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        // lets also make the screen 80% of the width  and 80% of the height
        width: srcWidth * 0.8,
        height: srcWidth * 0.8,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        // make sure there is space on top of text and bottom
        marginVertical: 12,
    },
    description: {
        textAlign: "center",
        // make sure there is space on top of text and bottom
        marginVertical: 12,
    },
});
