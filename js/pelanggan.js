import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



async function loadPelanggan(){


    const area = document.getElementById("dataPelanggan");


    try{


        const snapshot = await getDocs(
            collection(db,"reservasi")
        );


        let pelanggan = {};



        snapshot.forEach((doc)=>{


            const data = doc.data();


            let nama = data.nama || "Tanpa Nama";


            if(!pelanggan[nama]){


                pelanggan[nama] = {

                    nama: nama,

                    telepon: data.telepon || data.noHP || "-",

                    jumlah: 1,

                    terakhir: data.tanggal || "-"

                };


            }else{


                pelanggan[nama].jumlah++;


            }



        });




        let html = "";



        Object.values(pelanggan).forEach((p)=>{


            html += `

            <div class="stat-card">

                <h3>
                👤 ${p.nama}
                </h3>

                <p>
                📱 No HP : ${p.telepon}
                </p>

                <p>
                📋 Jumlah Reservasi : ${p.jumlah}
                </p>

                <p>
                📅 Reservasi Terakhir : ${p.terakhir}
                </p>

            </div>

            `;


        });



        area.innerHTML = html || "Belum ada data pelanggan";



    }catch(error){


        console.log(error);


        area.innerHTML =
        "Gagal mengambil data pelanggan";


    }


}



loadPelanggan();
