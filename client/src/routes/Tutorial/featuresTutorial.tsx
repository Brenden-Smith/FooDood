// This is one page of the three page turtorial modal for first time users, it is displayed when the user first logs in
import { memo,} from "react";
import { Text, View } from "react-native";
import { text } from "@/theme";
import { styles } from "./styles";


export default memo(() => {
    return (
        <View style={styles.tutorialContainer}>
            <Text style={[text.h3, styles.title]}>Features Tutorial</Text>
            <Text style={[styles.description]}>This is the tutorial where we will explain likes, super likes, and im feeling lucky</Text>
        </View>
    );

});
