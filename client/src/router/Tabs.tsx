import { useNavigation } from "@/hooks";
import { Likes, Plates, Tags } from "@/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	const navigation = useNavigation();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				headerRight: () => (
					<TouchableOpacity
						onPress={() => navigation.navigate("Settings")}
					>
						<FontAwesome
							name="gear"
							size={26}
							color="black"
							style={{
								marginRight: 20,
							}}
						/>
					</TouchableOpacity>
				),
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 24,
				},
				headerTitleAlign: "center",
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
					headerShown: true,
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
	);
}
