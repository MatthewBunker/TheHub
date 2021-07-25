import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCqrHc9dZJHJuF95OEI950nm3qLt-K3Tcc",
    authDomain: "stocktracker-dbf8e.firebaseapp.com",
    projectId: "stocktracker-dbf8e",
    storageBucket: "stocktracker-dbf8e.appspot.com",
    messagingSenderId: "1049148230541",
    appId: "1:1049148230541:web:b581156959a7a956400bc4",
    measurementId: "G-Y6R8V3PNXY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};