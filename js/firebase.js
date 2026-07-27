// firebase.js

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDpYIrRnPxGbvz5m9XEqXsqfVBN1EqhXRs",
    authDomain: "sires-d5266.firebaseapp.com",
    projectId: "sires-d5266",
    storageBucket: "sires-d5266.firebasestorage.app",
    messagingSenderId: "715463566268",
    appId: "1:715463566268:web:71bf078fcbad8d433541b9",
    measurementId: "G-MKM8YN61S9"
};


// Jalankan Firebase
const app = initializeApp(firebaseConfig);


// Database Firestore
const db = getFirestore(app);


// export supaya bisa dipakai file lain
export { db };
