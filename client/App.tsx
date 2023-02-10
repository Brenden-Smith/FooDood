import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Navigator from "./navigation/Navigator";
import "./service/firebase";
import Login from "./screens/auth/Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [signedIn, setSignedIn] = useState<boolean | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setMounted(true);
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  });

  return mounted && signedIn !== undefined ? (
    signedIn ? (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    ) : (
      <Login />
    )
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
