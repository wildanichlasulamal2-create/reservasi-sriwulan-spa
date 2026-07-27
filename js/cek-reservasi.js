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
// AMBIL NOMOR BOOKING DARI URL
// ========================

const urlParams = new URLSearchParams(window.location.search);

const nomorBooking = urlParams.get("booking");




// ========================
// CEK DATA
// ========================

async function cekReservasi(){


    const q = query(

        collection(db,"reservasi"),

        where("booking","==",nomorBooking)

    );



    const snapshot = await getDocs(q);



    if(snapshot.empty){


        document.getElementById("hasil").innerHTML = `

        <div class="hasil-card">

        <h2>❌ Data Tidak Ditemukan</h2>

        </div>

        `;


        return;

    }





    snapshot.forEach((doc)=>{


        let data = doc.data();



        document.getElementById("hasil").innerHTML = `


        <div class="hasil-card">


        <h2>
        ✅ Reservasi Berhasil
        </h2>



        <div class="info">

        <span>🔖 Nomor Booking</span>

        <h3>${data.booking}</h3>

        </div>



        <div class="info">

        <span>👤 Nama</span>

        <p>${data.nama}</p>

        </div>



        <div class="info">

        <span>💆 Treatment</span>

        <p>${data.treatment}</p>

        </div>



        <div class="info">

        <span>💰 Harga</span>

        <p>${data.harga}</p>

        </div>



        <div class="info">

        <span>👩 Terapis</span>

        <p>${data.terapis}</p>

        </div>



        <div class="info">

        <span>📅 Tanggal</span>

        <p>${data.tanggal}</p>

        </div>



        <div class="info">

        <span>🕒 Jam</span>

        <p>${data.jam}</p>

        </div>



        <div class="info">

        <span>📌 Status</span>

        <p class="status">${data.status}</p>

        </div>



        <a href="index.html" class="btn-kembali">

        🏠 Kembali ke Beranda

        </a>



        </div>


        `;


    });



}



cekReservasi();
