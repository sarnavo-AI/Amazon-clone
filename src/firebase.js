import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4bZBIHBnzo8EIeWLtJGMfmrU_uR4Ti-Y",
    authDomain: "challenge-37a80.firebaseapp.com",
    projectId: "challenge-37a80",
    storageBucket: "challenge-37a80.appspot.com",
    messagingSenderId: "554158253449",
    appId: "1:554158253449:web:17a803fefe09941090ed58",
    measurementId: "G-NJDLSMQHCH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

