// ========================
// IMPORT FIREBASE
// ========================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



// ========================
// AMBIL DATA RESERVASI
// ========================

let reservasi = [];


async function loadReservasi(){

    const data = await getDocs(
        collection(db,"reservasi")
    );


    reservasi = [];


    data.forEach((item)=>{

        reservasi.push({

            id:item.id,

            ...item.data()

        });

    });


    tampilkanReservasi();

}





// ========================
// TAMPILKAN DATA
// ========================

function tampilkanReservasi(){


    const tbody = document.getElementById("tabelReservasi");


    tbody.innerHTML = "";



    reservasi.forEach((r,index)=>{


        tbody.innerHTML += `

        <tr>

            <td>${r.booking}</td>

            <td>${r.nama}</td>

            <td>${r.treatment}</td>

            <td>${r.terapis}</td>

            <td>${r.tanggal}</td>

            <td>${r.jam}</td>

            <td>${r.status}</td>


            <td>

                <button onclick="konfirmasi('${r.id}')">
                Konfirmasi
                </button>


                <button onclick="selesai('${r.id}')">
                Selesai
                </button>


                <button onclick="hapusReservasi('${r.id}')">
                Hapus
                </button>

            </td>


        </tr>

        `;


    });


}





// ========================
// KONFIRMASI
// ========================

window.konfirmasi = async function(id){


    await updateDoc(

        doc(db,"reservasi",id),

        {

            status:"🟢 Dikonfirmasi"

        }

    );


    loadReservasi();

}





// ========================
// SELESAI
// ========================

window.selesai = async function(id){


    await updateDoc(

        doc(db,"reservasi",id),

        {

            status:"✅ Selesai"

        }

    );


    loadReservasi();

}





// ========================
// HAPUS
// ========================

window.hapusReservasi = async function(id){


    if(confirm("Yakin ingin menghapus reservasi?")){


        await deleteDoc(

            doc(db,"reservasi",id)

        );


        loadReservasi();


    }


}





// Jalankan
loadReservasi();
