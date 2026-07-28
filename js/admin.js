import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



// LOAD DATA RESERVASI

async function loadReservasi(){

    const area = document.getElementById("dataBooking");

    try {

        const snapshot = await getDocs(
            collection(db,"reservasi")
        );


        let html = "";

        let total = 0;
        let menunggu = 0;
        let dikonfirmasi = 0;
        let selesai = 0;



        snapshot.forEach((item)=>{


            const data = item.data();

            const id = item.id;


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
                Status :
                <b>${data.status}</b>
                </p>


                <button onclick="konfirmasi('${id}')">
                🟢 Konfirmasi
                </button>


                <button onclick="selesaiReservasi('${id}')">
                ✅ Selesai
                </button>


                <button onclick="hapusReservasi('${id}')">
                🗑️ Hapus
                </button>


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





// UPDATE STATUS

async function ubahStatus(id,status){

    const ref = doc(db,"reservasi",id);


    await updateDoc(ref,{
        status:status
    });


    loadReservasi();

}





// KONFIRMASI

window.konfirmasi = function(id){

    ubahStatus(id,"Dikonfirmasi");

}





// SELESAI

window.selesaiReservasi = function(id){

    ubahStatus(id,"Selesai");

}





// HAPUS

window.hapusReservasi = async function(id){


    if(confirm("Hapus reservasi ini?")){


        await deleteDoc(
            doc(db,"reservasi",id)
        );


        loadReservasi();

    }

}




loadReservasi();
