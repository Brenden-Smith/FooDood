import { Button, View, Text, TextInput, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

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

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  function validate() {
    if (email === 'Username or Email' || password === 'Password') {
      setError('Please enter a valid username and password');
      return false;
    } else {
      setError('');
      return true;
    }
  }

  function login() {
    if (validate()) {
      signInWithEmailAndPassword(getAuth(), email, password).catch((error) => {
        setError(error.message);
      })
    }
  }

  function signUp() {
    if (validate()) {
      createUserWithEmailAndPassword(getAuth(), email, password).catch((error) => {
        setError(error.message);
      });
    }
  }
  
  // Render front end component
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="mb-4">Login</Text>
          <View className="items-center h-auto rounded w-4/5 py-5 bg-slate-200">
            <TextInput
              className="rounded bg-white w-64 align-middle mb-4 pl-2"
              onChangeText={setEmail}
          value={email}
          placeholder="Username or Email"
            />
            <TextInput
              className="rounded bg-white w-64 align-middle mb-4 pl-2"
              onChangeText={setPassword}
              value={password}
          />
          <Text className="mb-4 underline">Help Logining In?</Text>
          <View className="h-1 w-64 bg-white mb-4"></View>
          <Text className="mb-4 ">Login with</Text>
          <TouchableOpacity className="rounded bg-white w-64 align-middle mb-4 p-2" disabled={!request} onPress={() => promptAsync()} ><Text>Google</Text></TouchableOpacity>
          <TouchableOpacity className="rounded bg-white w-64 align-middle mb-4 p-2" disabled><Text>Twitter</Text></TouchableOpacity>
          <TouchableOpacity className="rounded bg-white w-64 align-middle mb-4 p-2" disabled><Text>Apple</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
