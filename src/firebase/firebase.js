import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { ref } from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyAN84ywv3l5nlrntQ6KFaHOYJBh2KBXEW0",
    authDomain: "vue-warfield.firebaseapp.com",
    projectId: "vue-warfield",
    storageBucket: "vue-warfield.appspot.com",
    messagingSenderId: "908790075731",
    appId: "1:908790075731:web:caa4e7ecf0efe2bbba51a6"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
