import { useNavigation } from "@/hooks";
import { Likes, Plates, Tags } from "@/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	const navigation = useNavigation();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				headerLeft: () => (
					<TouchableOpacity>
						<Image
							style={{
								width: 50,
								height: 50,
								borderRadius: 30,
								marginLeft: 20,
								marginTop: 7,
							}}
							source={{ uri: "https://picsum.photos/200/300" }}
						/>
					</TouchableOpacity>
				),
				headerRight: () => (
					<TouchableOpacity
						onPress={() => navigation.navigate("Settings")}
					>
						<Image
							style={{
								width: 40,
								height: 40,
								borderRadius: 30,
								marginRight: 20,
								marginTop: 7.5,
							}}
							source={require("@/assets/icons/settings-gear.png")}
						/>
					</TouchableOpacity>
				),
				headerTitleStyle: {
					fontSize: 30,
					fontWeight: "bold",
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
