import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCkc5matCjWF7wKzr0K2UBFpsA69pdXDJ4",
    authDomain: "tech-space-30a6d.firebaseapp.com",
    projectId: "tech-space-30a6d",
    storageBucket: "tech-space-30a6d.appspot.com",
    messagingSenderId: "565444653352",
    appId: "1:565444653352:web:613873b933aa3cdc07201d"
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export { db, auth }