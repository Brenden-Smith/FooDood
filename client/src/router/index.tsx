import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading, Login, Settings } from "@/routes";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@/hooks";
import Tabs from "./Tabs";

// Create stack and tab navigators
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The application navigation stack
 * @returns {JSX.Element}
 */
export default function Router(): JSX.Element {
	const navigation = useNavigation();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(getAuth(), async (user) => {
			setUser(user);
			if (user) {
				const token = await user.getIdToken();
				await getDoc(doc(getFirestore(), "users", user.uid)).then(
					(doc) => {
						if (doc.exists()) return;
						axios
							.post(
								"http://api.foodood.dev/users",
								{
									name: user.displayName,
									email: user.email,
									birthday: new Date(),
									createdAt: new Date(),
								},
								{
									headers: {
										Authorization: token,
									},
								},
							)
							.catch((err) => {
								console.log(err);
							});
					},
				);
				navigation.navigate("Home");
			} else {
				navigation.navigate("Login");
			}
		});
	});

	return (
		<Stack.Navigator
			initialRouteName="Loading"
			screenOptions={{
				headerShown: false,
			}}
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
			{user && (
				<Stack.Group>
					<Stack.Screen
						name="Home"
						options={{ gestureEnabled: false }}
						component={Tabs}
					/>
					<Stack.Screen
						name="Settings"
						component={Settings}
						options={{ gestureEnabled: false, headerShown: true }}
					/>
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
}
