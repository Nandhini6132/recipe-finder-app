
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDMeb_n6du0mdvGm8y44tgxhHMjrQjHMAU",
  authDomain: "recipe-finder-app-239a7.firebaseapp.com",
  projectId: "recipe-finder-app-239a7",
  storageBucket: "recipe-finder-app-239a7.appspot.com",
  messagingSenderId: "781384210678",
  appId: "1:781384210678:web:aa6893752086f6e90ab4d7"
};


const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const auth= getAuth(app)
export const provider= new GoogleAuthProvider()