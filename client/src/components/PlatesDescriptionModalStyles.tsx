import { colors } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        display: "flex",
        flex: 0.8,
        width: "90%",
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    modalBody: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        
    },
    subHeading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    modalTagsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    modalTag: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.creamGreen,
        borderRadius: 12,
        padding: 10,
        margin: 5,
    },
    modalImage: {
        width: "80%",
        height: "50%",
        resizeMode: "cover",
        overflow: "hidden",
        borderRadius: 15,
        flex: 1,
        elevation: 6
    },

});