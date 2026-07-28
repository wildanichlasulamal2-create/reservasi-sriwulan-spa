// ========================
// IMPORT FIREBASE
// ========================

import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";



// ========================
// ELEMENT
// ========================

const form = document.getElementById("loginForm");
const pesan = document.getElementById("pesan");



// ========================
// LOGIN
// ========================

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    pesan.innerHTML = "";

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("✅ Login berhasil");

        window.location.href = "reservasi.html";

    }catch(error){

        console.error(error);

        switch(error.code){

            case "auth/invalid-credential":
                pesan.innerHTML = "❌ Email atau Password salah.";
                break;

            case "auth/invalid-email":
                pesan.innerHTML = "❌ Format email tidak valid.";
                break;

            default:
                pesan.innerHTML = "❌ Login gagal.";
                break;
        }

    }

});
