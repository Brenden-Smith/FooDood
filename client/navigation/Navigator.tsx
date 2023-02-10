import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tags, Plates, Likes } from '../screens';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function NavTab() {
  return (
    <Tab.Navigator
      screenOptions= {{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Tags" component={Tags} options={{tabBarIcon:() =><Image style={{width: 25, height: 25,}} source={require("../assets/icons/tag-solid.png")}/>}}/>
      <Tab.Screen name="Plates" component={Plates} options={{tabBarIcon:() =><Image style={{width: 25, height: 25,}} source={require("../assets/icons/plate-utensils.png")}/>}}/>
      <Tab.Screen name="Likes" component={Likes} options={{tabBarIcon:() =><Image style={{width: 25, height: 25,}} source={require("../assets/icons/star-solid.png")}/>}}/>
    </Tab.Navigator>
  );
}