import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "@/service/firebase";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "@/router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);

const queryClient = new QueryClient();

/**
 * App
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
	return (
		<>
			<StatusBar style="auto" />
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer>
						<Router />
					</NavigationContainer>
				</QueryClientProvider>
			</SafeAreaProvider>
		</>
	);
}
