// create a modal which loads in multiple different components about the application such as a tutorial about the tags and how they affect the results, as well as a tutorial about swiping and a tutorial interacting with the likes
import { memo, useCallback, useState } from "react";
import { Text, View, Modal, TouchableOpacity } from "react-native";
import { text } from "@/theme";
import { TutorialStyles } from "./TutorialStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TutorialSwipe from "./TutorialSwipe";
import TutorialTags from "./TutorialTags";
import TutorialLikes from "./TutorialLikes";



export default memo(
	({
		
		visible,
		setVisible,
	}: {
		
		visible: boolean;
		setVisible: (visible: boolean) => void;
	}) => {
        const onDismiss = useCallback(() => setVisible(false), [setVisible]);
        const [tutorialPage, setTutorialPage] = useState(1);

        const nextPage = useCallback(() => {
            setTutorialPage(tutorialPage + 1);
        }
        , [tutorialPage]);

        const previousPage = useCallback(() => {
            setTutorialPage(tutorialPage - 1);
        }
        , [tutorialPage]);

        
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={TutorialStyles.tutorialContainer}>
                {/* <View style={TutorialStyles.tutorialInner}> */}
                    <View style={TutorialStyles.tutorialHeader}>
                        <TouchableOpacity onPress={onDismiss}>
                            <MaterialCommunityIcons
                                name="close"
                                size={30}
                                color="white"
                                style={TutorialStyles.closeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={TutorialStyles.tutorialBody}>
                        {tutorialPage === 1 && <TutorialSwipe />}
                        {tutorialPage === 2 && <TutorialTags />}
                        {tutorialPage === 3 && <TutorialLikes />}
                    </View>
                    <View style={TutorialStyles.tutorialFooter}>
                        <TouchableOpacity onPress={previousPage}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                size={30}
                                color="white"
                                style={TutorialStyles.prevIcon}
                            />
                        </TouchableOpacity>
                        <Text style={TutorialStyles.tutorialFooterText}>{tutorialPage}/3</Text>
                        <TouchableOpacity onPress={nextPage}>
                            <MaterialCommunityIcons
                                name="arrow-right"
                                size={30}
                                color="white"
                                style={TutorialStyles.nextIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </View> */}
        </Modal>

    );

    }
);
// Path: client/src/routes/Tutorial/Tutorial.tsx
    
