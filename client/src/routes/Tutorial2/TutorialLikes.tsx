import { View, Text, Image} from "react-native"
import { TutorialStyles } from "./TutorialStyles";
import { text } from "@/theme"
import { memo } from "react"
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons"
// import the swiping GIF from the assets folder


export default memo(() => {
    return (
        <View style={TutorialStyles.tutorialContainer}>
            <Text style={[text.h3, TutorialStyles.tutorialTitle]}>Likes Tutorial</Text>
            <Ionicons
                name="ios-star"
                size={30}
                color="black"
            />
            <Text style={[TutorialStyles.tutorialDescription]}>
                To view your likes, click on the "Likes" tab at the bottom right of the screen.
            </Text>
            <FontAwesome5 name="info" size={30} color="black" style={TutorialStyles.infoBadge}/>
            <Text style={[TutorialStyles.tutorialDescription]}>
                To view more information about a dish that you've liked, press on the dish.
            </Text>
            
			<AntDesign name="close" size={30} color="white" style={TutorialStyles.removeLikeStyle}/>
					
            <Text style={[TutorialStyles.tutorialDescription]}>
                You can remove likes by selecting the "Remove" on the right side of the like.
            </Text>
        </View>
    );

});

