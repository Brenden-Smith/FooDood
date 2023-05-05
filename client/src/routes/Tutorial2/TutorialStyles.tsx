import { colors } from "@/theme";
import { text } from "@/theme";
import { StyleSheet } from "react-native";



export const TutorialStyles = StyleSheet.create({
    tutorialContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.cream,
    },
    tutorialTitle: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 24,
        marginTop: 16,
        color: colors.creamPurple,
    },
    tutorialDescription: {
        fontSize: 20,
        marginBottom: 24,
    },
    tutorialText: {
        fontSize: 16,
        marginBottom: 10,
    },
    tutorialImage: {
        width: 300,
        height: 300,
        marginBottom: 24,
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
        paddingHorizontal: 64,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tutorialTextBtn: {
        fontSize: 20,
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
        paddingHorizontal: 32,
        marginBottom: 12,
    },
    tutorialBody: {
        display : "flex",
        flex: 1,
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
        marginBottom: 10,
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


});