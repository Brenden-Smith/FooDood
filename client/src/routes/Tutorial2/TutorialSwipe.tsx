import { View, Text, Image} from "react-native"
import { TutorialStyles } from "./TutorialStyles";
import { text } from "@/theme"
import { memo } from "react"
// import the swiping GIF from the assets folder


export default memo(() => {
    return (
        <View style={TutorialStyles.tutorialContainer}>
            <Text style={[text.h3, TutorialStyles.tutorialTitle]}>Features Tutorial</Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
            Hello! Welcome to the FoodDood! We are here to help you find the best food in your area!
            </Text>
            {/* include an animation of how to swipe in the application using the gif */}
            <Image source={require("../../../assets/swiping.gif")} style={TutorialStyles.tutorialImage} />
            <Text style={[TutorialStyles.tutorialDescription]}>
            Swipe right to like a restaurant, swipe left to dislike a restaurant.
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
            If you like a restaurant, it will be saved to your likes page. Tastes change, so these likes will only be saved for 1 week. You can always remove a like if you change your mind!
            </Text>
            <Text style={[TutorialStyles.tutorialDescription]}>
                If you SuperLike a restaurant, it will be saved forever!
            </Text>
            
        </View>
    );

});

