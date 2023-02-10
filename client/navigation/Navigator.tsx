import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tags, Plates, Likes } from '../screens';

const Tab = createBottomTabNavigator();

export default function NavTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Plates" component={Plates} />
      <Tab.Screen name="Tags" component={Tags} />
      <Tab.Screen name="Likes" component={Likes} />
    </Tab.Navigator>
  );
}