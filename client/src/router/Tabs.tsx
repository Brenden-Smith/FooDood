import { useNavigation } from "@/hooks";
import { Likes, Plates, Tags } from "@/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants";

const Tab = createBottomTabNavigator();

const tagsScreen = "Tags";
const platesScreen = "Plates";
const likesScreen = "Likes";

export default function Tabs() {
	const navigation = useNavigation();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.creamPurple,
					height: 60,
				},
				
				tabBarIcon: ({ focused }) => {
					let iconName;
					let rn = route.name;

					if (rn === tagsScreen) {
						iconName = focused ? 'pricetags' : 'pricetags-outline';

					} else if (rn === platesScreen) {
						iconName = focused ? 'fast-food' : 'fast-food-outline';

					} else if (rn === likesScreen) {
						iconName = focused ? 'ios-star' : 'ios-star-outline';
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={32} color="white"/>;
				},
				headerRight: () => (
					<TouchableOpacity onPress={() => navigation.navigate("Settings")} >
						<FontAwesome name="gear" size={26} color="white" style={{ marginRight: 20 }} />
					</TouchableOpacity>
				),
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 24,
					color: "white",
				},
				headerStyle: {backgroundColor: colors.creamPurple},
				headerTitleAlign: "center",
			})}
		>
			<Tab.Screen name={tagsScreen} component={Tags} />
			<Tab.Screen name={platesScreen} component={Plates} />
			<Tab.Screen name={likesScreen} component={Likes} />
		</Tab.Navigator>
	);
}
