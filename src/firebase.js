import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCinp6RjHU2nZjrUPrn5WWCYfnq_apHNyk",
    authDomain: "zari-b4d28.firebaseapp.com",
    databaseURL: "https://zari-b4d28.firebaseio.com",
    projectId: "zari-b4d28",
    storageBucket: "zari-b4d28.appspot.com",
    messagingSenderId: "226032074782",
    appId: "1:226032074782:web:9a77a0b19538c040682e0f"
  };

  export default firebase.initializeApp(firebaseConfig);