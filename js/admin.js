import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


// ambil data reservasi

async function loadReservasi(){

    const area = document.getElementById("dataBooking");

    try {

        const querySnapshot = await getDocs(
            collection(db,"reservasi")
        );


        let html = "";

        let total = 0;
        let menunggu = 0;
        let dikonfirmasi = 0;
        let selesai = 0;



        querySnapshot.forEach((doc)=>{


            const data = doc.data();


            total++;


            if(data.status=="Menunggu"){
                menunggu++;
            }

            if(data.status=="Dikonfirmasi"){
                dikonfirmasi++;
            }

            if(data.status=="Selesai"){
                selesai++;
            }



            html += `

            <div class="stat-card">

            <h3>${data.nama}</h3>

            <p>
            Booking : ${data.kodeBooking || "-"}
            </p>

            <p>
            Treatment : ${data.treatment}
            </p>

            <p>
            Tanggal : ${data.tanggal}
            </p>

            <p>
            Jam : ${data.jam}
            </p>

            <p>
            Status : ${data.status}
            </p>

            </div>

            `;


        });



        area.innerHTML = html || "Belum ada reservasi";



        document.getElementById("totalReservasi").innerHTML = total;

        document.getElementById("menunggu").innerHTML = menunggu;

        document.getElementById("dikonfirmasi").innerHTML = dikonfirmasi;

        document.getElementById("selesai").innerHTML = selesai;



    }catch(error){

        console.log(error);

        area.innerHTML="Gagal mengambil data";

    }

}



loadReservasi();
