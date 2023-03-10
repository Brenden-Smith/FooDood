
import { colors } from "@/constants";
import { StyleSheet } from "react-native";

export const likesStyles = StyleSheet.create({
	likeContainer: {
        display: "flex",
		flexDirection: "row",
		alignItems: "center",
        justifyContent: "space-between",
        // Prevent items from wrapping
		margin: 10,
		padding: 10,
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: "black",
        // wrap text
        flexWrap: "nowrap",
        backgroundColor: colors.white,
	},
	removeLikeButton: {
		backgroundColor: colors.creamRed,
		padding: 3,
        borderRadius: 5,
	},
    likedImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
        resizeMode: "cover",
    },

});