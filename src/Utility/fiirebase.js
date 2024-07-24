// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGYA4dQ6igE113ikQ1ohXFY_IffE2-lEk",
  authDomain: "clone-fe3e9.firebaseapp.com",
  projectId: "clone-fe3e9",
  storageBucket: "clone-fe3e9.appspot.com",
  messagingSenderId: "842669818393",
  appId: "1:842669818393:web:550fc80868a1c180f0e088",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app);

export { auth, db };
