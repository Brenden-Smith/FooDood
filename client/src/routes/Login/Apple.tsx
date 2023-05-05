import { LoadingOverlay } from "@/components";
import { memo, useState } from "react";
import { StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
import * as Crypto from "expo-crypto";
import { colors } from "@/theme";

const provider = new OAuthProvider("apple.com");

export default memo(() => {
	const [loading, setLoading] = useState(false);
	return (
		<>
			<LoadingOverlay loading={loading} />
			<AppleAuthentication.AppleAuthenticationButton
				buttonType={
					AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
				}
				buttonStyle={
					AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
				}
				cornerRadius={5}
				style={styles.button}
				onPress={async () => {
					try {
						setLoading(true);
						const csrf = Math.random()
							.toString(36)
							.substring(2, 15);
						const nonce = Math.random()
							.toString(36)
							.substring(2, 10);
						const hashedNonce = await Crypto.digestStringAsync(
							Crypto.CryptoDigestAlgorithm.SHA256,
							nonce,
						);
						const credential =
							await AppleAuthentication.signInAsync({
								requestedScopes: [
									AppleAuthentication.AppleAuthenticationScope
										.FULL_NAME,
									AppleAuthentication.AppleAuthenticationScope
										.EMAIL,
								],
								state: csrf,
								nonce: hashedNonce,
							});
						if (credential && credential.identityToken)
							await signInWithCredential(
								getAuth(),
								provider.credential({
									idToken: credential.identityToken,
									rawNonce: nonce,
								}),
							);
						setLoading(false);
					} catch (e: any) {
						setLoading(false);
					}
				}}
			/>
		</>
	);
});

const styles = StyleSheet.create({
	button: {
		width: 300,
		height: 50,
		marginBottom: 24,
		justifyContent: "center",
		alignItems: "center",
	},
});
