// ========================
// IMPORT FIREBASE
// ========================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



// ========================
// ELEMENT
// ========================

const treatment = document.getElementById("treatment");
const harga = document.getElementById("harga");
const form = document.getElementById("bookingForm");




// ========================
// DAFTAR HARGA
// ========================

const daftarHarga = {

    "Massage Relax": "150000",

    "Facial Treatment": "120000",

    "Body Scrub": "175000"

};




// ========================
// OTOMATIS HARGA
// ========================

treatment.addEventListener("change", function(){

    harga.value = "Rp " + daftarHarga[this.value];

});






// ========================
// SUBMIT RESERVASI
// ========================

form.addEventListener("submit", async function(e){

    e.preventDefault();



    try {



        // Ambil jumlah data untuk nomor booking

        const snapshot = await getDocs(
            collection(db,"reservasi")
        );


        const nomorUrut = snapshot.size + 1;



        const nomorBooking =

            "SRS-" +

            new Date().getFullYear() +

            String(nomorUrut).padStart(3,"0");






        // ========================
        // DATA RESERVASI
        // ========================


        let dataBooking = {


            booking: nomorBooking,


            nama: document.getElementById("nama").value,


            wa: document.getElementById("noWa").value,


            treatment: document.getElementById("treatment").value,


            harga: document.getElementById("harga").value,


            terapis: document.getElementById("terapis").value,


            tanggal: document.getElementById("tanggal").value,


            jam: document.getElementById("jam").value,


            status: "🟡 Menunggu",


            waktu: new Date()

        };






        // ========================
        // SIMPAN FIRESTORE
        // ========================


        await addDoc(

            collection(db,"reservasi"),

            dataBooking

        );







        // ========================
        // PESAN BERHASIL
        // ========================


        alert(

            "✅ Reservasi berhasil dibuat\n\n" +

            "Nomor Booking : " + nomorBooking

        );






        // ========================
        // PINDAH HALAMAN CEK
        // ========================


        window.location.href =
 "/reservasi-sriwulan-spa/cek-reservasi.html?booking=" + nomorBooking;




    } catch(error){


        console.error(error);


        alert(

            "❌ Gagal menyimpan reservasi"

        );


    }



});
