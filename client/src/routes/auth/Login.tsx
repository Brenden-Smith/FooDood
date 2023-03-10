import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithCredential,
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
    <SafeAreaView style={styles.pageContainer}>
        <Text style={styles.textTitle}>Login</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Username or Email"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.textLoginBtn}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.textNormal, styles.textLink]}>Need Help Logging In?</Text>
        <Text style={styles.textNormal}>
          <Text style={styles.textNormal}>Don't have an Account </Text>
          <Text style={[styles.textNormal, styles.textLink]}>Sign Up</Text>
        </Text>
        <View style={styles.divider}></View>
        <Text style={styles.textNormal}>Login with</Text>
        <TouchableOpacity style={styles.loginAlt} disabled={!request} onPress={() => promptAsync()} >
          <Text style={styles.textLoginAlt}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginAlt} disabled>
          <Text style={styles.textLoginAlt}>Apple</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbe3cd',
  },
  textTitle: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#7c437b',
  },
  textInput: {
    backgroundColor: '#fceee3',
    borderRadius: 10,
    width: 300,
    paddingLeft: 12,
    paddingVertical: 10,
    marginBottom: 24,
    fontSize: 20,
  }, 
  textNormal: {
    fontSize: 16,
    marginBottom: 10,
  },
  textLink: {
    textDecorationLine: 'underline',
    color: '#7c437b',
  },
  divider: {
    width: 300,
    height: 10,
    backgroundColor: '#fceee3',
    borderRadius: 10,
    marginBottom: 10,
  },
  loginAlt: {
    backgroundColor: '#fceee3',
    borderRadius: 10,
    width: 300,
    paddingLeft: 12,
    paddingVertical: 10,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoginAlt: {
    fontSize: 20
  },
  loginBtn: {
    backgroundColor: '#fa973b',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 64,
    marginBottom: 12,
  },
  textLoginBtn: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  }
});