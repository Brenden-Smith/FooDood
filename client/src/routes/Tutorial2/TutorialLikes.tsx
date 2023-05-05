import { View, Text, Image} from "react-native"
import { TutorialStyles } from "./TutorialStyles";
import { text } from "@/theme"
import { memo } from "react"
import { Ionicons } from "@expo/vector-icons"
// import the swiping GIF from the assets folder


export default memo(() => {
    return (
        <View style={TutorialStyles.tutorialContainer}>
            <Text style={[text.h3, TutorialStyles.tutorialTitle]}>Likes Tutorial</Text>
            <Ionicons
                name="ios-star"
                size={24}
                color="black"
            />
            <Text style={[TutorialStyles.tutorialDescription]}>
                To view your likes, click on the "Likes" tab at the bottom right of the screen.
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
                To view more information about a dish that you've liked, press on the dish.
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
                You can remove likes by selecting the "Remove" on the right side of the like.
            </Text>
        </View>
    );

});

