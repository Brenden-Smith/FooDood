import 'react-native-reanimated';
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "@/service/firebase";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "@/router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HoldMenuProvider } from "react-native-hold-menu";

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
					<HoldMenuProvider>
						<NavigationContainer>
							<Router />
						</NavigationContainer>
					</HoldMenuProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</>
	);
}
