import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Navigator from "./navigation/Navigator";
import "./service/firebase";
import Login from "./screens/auth/Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import axios from "axios";

type UserData = {
  name: string;
  email: string;
  uid: string;
  birthday: Date;
  createdAt: Date;
  latitude: number;
  longitude: number;
};

export default function App() {
  const [signedIn, setSignedIn] = useState<boolean | undefined>();
  const [mounted, setMounted] = useState(false);

  // Check if user is signed in or not
  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      setMounted(true);
      if (user) {
        const token = await user.getIdToken();
        await getDoc(doc(getFirestore(), "users", user.uid)).then((doc) => {
          if (doc.exists()) return;
          axios
            .post(
              "http://api.foodood.dev/users",
              {
                name: "User Name",
                email: user.email,
                birthday: new Date(),
                createdAt: new Date(),
                latitude: 0,
                longitude: 0,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  });

  // If user is signed in, show the app, otherwise show the login screen
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
