// ========================
// IMPORT FIREBASE
// ========================

import { auth } from "../../js/firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// ========================
// LOGIN
// ========================

const form = document.getElementById("loginForm");
const pesan = document.getElementById("pesan");

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("✅ Login berhasil");

        window.location.href="dashboard.html";

    }catch(error){

        console.log(error);

        pesan.innerHTML="❌ Email atau Password salah.";

    }

});
