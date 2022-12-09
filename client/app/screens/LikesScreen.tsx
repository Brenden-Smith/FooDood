import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"

export const LikesScreen: FC<DemoTabScreenProps<"Likes">> = 
    function LikesScreen(_props) {
        return (
            <Screen contentContainerStyle={$container} preset="scroll" safeAreaEdges={["top"]}>
                <Text> This is the Likes Page!</Text>
            </Screen>
        )
    }

const $container: ViewStyle = {
    paddingTop: spacing.large + spacing.extraLarge,
    paddingHorizontal: spacing.large,
}