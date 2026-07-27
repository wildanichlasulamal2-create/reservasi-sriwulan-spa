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
// CEK RESERVASI
// ========================

async function cekReservasi(){


    if(!nomorBooking){


        document.getElementById("hasil").innerHTML = `


        <div class="hasil-card">


        <h2>❌ Nomor Booking Tidak Ada</h2>


        <p>
        Data reservasi tidak ditemukan.
        </p>


        </div>


        `;


        return;


    }



    try{


        const q = query(

            collection(db,"reservasi"),

            where("booking","==",nomorBooking)

        );



        const snapshot = await getDocs(q);



        if(snapshot.empty){


            document.getElementById("hasil").innerHTML = `


            <div class="hasil-card">


            <h2>❌ Data Reservasi Tidak Ditemukan</h2>


            <p>
            Silakan lakukan reservasi kembali.
            </p>


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

            <span>👤 Nama Pelanggan</span>

            <p>${data.nama}</p>

            </div>




            <div class="info">

            <span>📱 WhatsApp</span>

            <p>${data.wa}</p>

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

            <span>📅 Tanggal Reservasi</span>

            <p>${data.tanggal}</p>

            </div>




            <div class="info">

            <span>🕒 Jam Reservasi</span>

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



    }catch(error){


        console.error(error);


        document.getElementById("hasil").innerHTML = `


        <div class="hasil-card">


        <h2>❌ Terjadi Kesalahan</h2>


        <p>${error.message}</p>


        </div>


        `;


    }


}



// ========================
// JALANKAN
// ========================

cekReservasi();
