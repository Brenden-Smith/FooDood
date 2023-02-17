import { getApps, initializeApp } from "firebase/app";

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp({
    apiKey: "AIzaSyAZHB1eurNgiWTpzwo7CUvBdlZO55mLdxI",
    authDomain: "foodood-cloud.firebaseapp.com",
    projectId: "foodood-cloud",
    storageBucket: "foodood-cloud.appspot.com",
    messagingSenderId: "637872410840",
    appId: "1:637872410840:web:d41ebda88d12de870787ad",
    measurementId: "G-VMXSSQE6RS",
  });
}
