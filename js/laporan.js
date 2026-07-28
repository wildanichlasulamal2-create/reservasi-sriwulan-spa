import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



async function loadLaporan(){


    const area = document.getElementById("dataLaporan");


    try{


        const snapshot = await getDocs(
            collection(db,"reservasi")
        );


        let total = 0;
        let pendapatan = 0;
        let selesai = 0;
        let menunggu = 0;


        let html = "";



        snapshot.forEach((doc)=>{


            const data = doc.data();


            total++;


            if(data.status=="Selesai"){
                selesai++;

                pendapatan += Number(data.harga) || 0;
            }


            if(data.status=="Menunggu"){
                menunggu++;
            }



            html += `

            <div class="stat-card">

            <h3>${data.nama}</h3>

            <p>
            Treatment : ${data.treatment}
            </p>

            <p>
            Harga : Rp ${Number(data.harga || 0).toLocaleString("id-ID")}
            </p>

            <p>
            Status : ${data.status}
            </p>

            </div>

            `;


        });



        document.getElementById("totalLaporan").innerHTML = total;


        document.getElementById("pendapatan").innerHTML =
        "Rp " + pendapatan.toLocaleString("id-ID");


        document.getElementById("laporanSelesai").innerHTML = selesai;


        document.getElementById("laporanMenunggu").innerHTML = menunggu;



        area.innerHTML =
        html || "Belum ada laporan";



    }catch(error){

        console.log(error);

        area.innerHTML="Gagal memuat laporan";

    }


}



loadLaporan();
