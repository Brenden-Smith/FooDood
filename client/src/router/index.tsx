import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading, Login, Settings } from "@/routes";
import { RootStackParamList } from "@/types";
import { useNavigation, useUserData } from "@/hooks";
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
				const data = await getDoc(doc(getFirestore(), `users/${user.uid}`));
				if (!data.exists()) {
					setDoc(doc(getFirestore(), `users/${user.uid}`), {
						createdAt: new Date(),
						displayName: user.displayName,
						email: user.email,
						tags: [],
					});
				}
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
