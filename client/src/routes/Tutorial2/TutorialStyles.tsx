import { colors } from "@/theme";
import { text } from "@/theme";
import { StyleSheet } from "react-native";



export const TutorialStyles = StyleSheet.create({
    tutorialContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        backgroundColor: colors.cream,
    },
    tutorialTitle: {
        fontFamily: 'Cabin_700Bold',
        marginBottom: 24,
        marginTop: 150,
        fontSize: 36,
        color: colors.creamPurple,
    },
    tutorialDescription: {
        fontSize: 20,
        marginBottom: 24,
        fontFamily: 'Cabin_400Regular'
    },
    tutorialText: {
        fontSize: 16,
        marginBottom: 10,
    },
    tutorialImage: {
        width: 200,
        height: 200,
        marginBottom: 24,
        borderRadius: 10
    },

    tutorialDivider: {
        width: 300,
        height: 6,
        backgroundColor: colors.creamPurple,
        borderRadius: 10,
        marginBottom: 20,
    },
    tutorialBtn: {
        backgroundColor: colors.creamOrange,
        borderRadius: 100,
        paddingVertical: 10,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tutorialTextBtn: {
        fontFamily: 'Cabin_700Bold',
    },
    closeIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        margin: 16,
        backgroundColor: colors.red
    },
    tutorialHeader: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        marginBottom: 12,
        fontFamily: 'Cabin_700Bold'
    },
    tutorialBody: {
        flex: 1,
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        marginBottom: 12,
    },
    tutorialFooter: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        marginBottom: 12,
    },
    tutorialFooterText: {
        fontSize: 16,
        margin: 20,
        
    },
    nextIcon: {
        backgroundColor: colors.creamOrange,
        borderRadius: 5,
        padding: 10,

    },
    prevIcon: {
        backgroundColor: colors.red,
        borderRadius: 5,
        padding: 10,
    },
    removeLikeStyle: {
        backgroundColor: colors.creamRed,
		padding: 3,
		borderRadius: 5,
    },
    infoBadge: {
        borderRadius: 15,
		backgroundColor: colors.blue,
		justifyContent: "center",
		alignItems: "center",
        padding: 15
    }
});