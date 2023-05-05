import { NavigationContainer } from "@react-navigation/native";
import "@/service/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Loading } from "@/routes";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

/**
 * App
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
	const [fontsLoaded] = useFonts({
		Cabin: require("./assets/fonts/Cabin.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return <Loading />;
	}

	return (
		<>
			<StatusBar style="light" />
			<View onLayout={onLayoutRootView}>
				<SafeAreaProvider>
					<QueryClientProvider client={queryClient}>
						<NavigationContainer>
							<Router />
						</NavigationContainer>
					</QueryClientProvider>
				</SafeAreaProvider>
			</View>
		</>
	);
}
