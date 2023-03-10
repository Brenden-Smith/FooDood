
import { colors } from "@/constants";
import { StyleSheet } from "react-native";

export const likesStyles = StyleSheet.create({
	likeContainer: {
        display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 10,
		padding: 10,
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: "black",
        // wrap text
        flexWrap: "wrap",
        backgroundColor: colors.white
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
        resizeMode: "cover",
    },

});