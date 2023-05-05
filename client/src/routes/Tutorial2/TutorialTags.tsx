import { View, Text, Image} from "react-native"
import { TutorialStyles } from "./TutorialStyles";
import { text } from "@/theme"
import { memo } from "react"
import { Ionicons } from "@expo/vector-icons"
// import the swiping GIF from the assets folder


export default memo(() => {
    return (
        <View style={TutorialStyles.tutorialContainer}>
            <Text style={[text.h3, TutorialStyles.tutorialTitle]}>Tags Tutorial</Text>
            <Ionicons
                name="pricetags"
                size={32}
                color="black"
            />
            <Text style={[TutorialStyles.tutorialDescription]}>
                To select new tags to follow, click on the "Tags" tab at the bottom left of the screen.
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
                You can select tags to follow by clicking on them and pressing "Save" at the top right of the screen when you're done!
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
                You can also remove tags by deselecting them and pressing "Save" again.
            </Text>
        </View>
    );

});

