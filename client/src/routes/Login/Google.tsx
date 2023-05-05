import { LoadingOverlay } from "@/components";
import { colors } from "@/theme";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithCredential,
} from "firebase/auth";
import { memo, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
// @ts-ignore
import GoogleLogo from "@/assets/icons/google.svg";

export default memo(() => {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId:
			"637872410840-d6ut3b9clpcenh663ssdi8ggk7pf03ac.apps.googleusercontent.com",
		iosClientId:
			"637872410840-5bl5c3d3i10vsblg3esujfb28a4lbebs.apps.googleusercontent.com",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (response?.type === "success") {
			signInWithCredential(
				getAuth(),
				GoogleAuthProvider.credential(response.params.id_token),
			)
				.then(() => setLoading(false))
				.catch(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [response]);
	return (
		<>
			<LoadingOverlay loading={loading} />
			<TouchableOpacity
				style={styles.loginAlt}
				disabled={!request}
				onPress={() => {
					setLoading(true);
					promptAsync();
				}}
			>
				<GoogleLogo width={14} height={14} style={styles.icon} />
				<Text style={styles.textLoginAlt}>Sign in with Google</Text>
			</TouchableOpacity>
		</>
	);
});

const styles = StyleSheet.create({
	loginAlt: {
		backgroundColor: colors.white,
		borderRadius: 5,
		width: 300,
		paddingLeft: 12,
		paddingVertical: 10,
		marginBottom: 24,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: 50,
	},
	textLoginAlt: {
		marginLeft: 5,
		transform: [{ translateX: -5 }],
		fontSize: 19,
		fontFamily: "Roboto_500Medium",
	},
	icon: {
		transform: [{ translateX: -5 }],
	},
});
