import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "@/service/firebase";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { Likes, Loading, Plates, Tags } from "@/routes";
import Login from "@/routes/auth/Login";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@/hooks";

/**
 * App
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

// Create stack and tab navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * The application navigation stack
 * @returns {JSX.Element}
 */
function AppStack(): JSX.Element {
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const token = await user.getIdToken();
        await getDoc(doc(getFirestore(), "users", user.uid)).then((doc) => {
          if (doc.exists()) return;
          axios
            .post(
              "http://api.foodood.dev/users",
              {
                name: user.displayName,
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
            .catch((err) => {
              console.log(err);
            });
        });
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  });

  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ gestureEnabled: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ gestureEnabled: false }}
        />
      </Stack.Group>
      <Stack.Screen
        name="Home"
        options={{ gestureEnabled: false }}
        children={() => (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="Tags"
              component={Tags}
              options={{
                tabBarIcon: () => (
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("@/assets/icons/tag-solid.png")}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Plates"
              component={Plates}
              options={{
                tabBarIcon: () => (
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("@/assets/icons/plate-utensils.png")}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Likes"
              component={Likes}
              options={{
                tabBarIcon: () => (
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("@/assets/icons/star-solid.png")}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      />
    </Stack.Navigator>
  );
}
