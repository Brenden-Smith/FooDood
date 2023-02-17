import { ActivityIndicator, View } from "react-native";

/**
 * Loading screen
 * @returns {JSX.Element}
 */
export function Loading(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
