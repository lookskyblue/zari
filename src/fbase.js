import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCinp6RjHU2nZjrUPrn5WWCYfnq_apHNyk",
  authDomain: "zari-b4d28.firebaseapp.com",
  databaseURL: "https://zari-b4d28.firebaseio.com",
  projectId: "zari-b4d28",
  storageBucket: "zari-b4d28.appspot.com",
  messagingSenderId: "226032074782",
  appId: "1:226032074782:web:9a77a0b19538c040682e0f"
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();