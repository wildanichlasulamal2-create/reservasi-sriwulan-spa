// ========================
// IMPORT FIREBASE
// ========================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



// ========================
// AMBIL NOMOR BOOKING
// ========================

let nomorBooking = prompt("Masukkan Nomor Booking Anda");



async function cekReservasi(){


    const q = query(

        collection(db,"reservasi"),

        where("booking","==",nomorBooking)

    );


    const snapshot = await getDocs(q);



    if(snapshot.empty){

        document.getElementById("hasil").innerHTML = `

        <div class="hasil-card">

        <h2>❌ Data Reservasi Tidak Ditemukan</h2>

        <p>Pastikan nomor booking benar.</p>

        </div>

        `;

        return;

    }



    snapshot.forEach((doc)=>{


        let data = doc.data();



        document.getElementById("hasil").innerHTML = `


        <div class="hasil-card">


        <h2>✅ Reservasi Ditemukan</h2>


        <p><b>Nomor Booking:</b> ${data.booking}</p>

        <p><b>Nama:</b> ${data.nama}</p>

        <p><b>WhatsApp:</b> ${data.wa}</p>

        <p><b>Treatment:</b> ${data.treatment}</p>

        <p><b>Harga:</b> ${data.harga}</p>

        <p><b>Terapis:</b> ${data.terapis}</p>

        <p><b>Tanggal:</b> ${data.tanggal}</p>

        <p><b>Jam:</b> ${data.jam}</p>

        <p><b>Status:</b> ${data.status}</p>


        </div>


        `;


    });


}



cekReservasi();
