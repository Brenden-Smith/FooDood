import { Button, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";

export default function Login() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "637872410840-d6ut3b9clpcenh663ssdi8ggk7pf03ac.apps.googleusercontent.com",
  });

  // Sign into Firebase with the Google credential
  useEffect(() => {
    if (response?.type === "success") {
      signInWithCredential(
        getAuth(),
        GoogleAuthProvider.credential(response.params.id_token)
      );
    }
  }, [response]);

  // Render front end component
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Login" disabled={!request} onPress={() => promptAsync()} />
    </View>
  );
}
