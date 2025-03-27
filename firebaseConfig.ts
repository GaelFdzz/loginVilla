import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCBPfV4zboWK3BANBjCGruzq7dCITp_epA",
    authDomain: "auth-9eaf7.firebaseapp.com",
    projectId: "auth-9eaf7",
    storageBucket: "auth-9eaf7.firebasestorage.app",
    messagingSenderId: "195629495540",
    appId: "1:195629495540:web:0409c1f6a2b6b77d631aa1",
    measurementId: "G-SM48JKP3YK"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)