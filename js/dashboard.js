import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const hari = new Date();

document.getElementById("tanggal").innerHTML =
hari.toLocaleDateString("id-ID",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});



// ============================
// GRAFIK RESERVASI
// ============================

new Chart(document.getElementById("reservasiChart"),{

type:"line",

data:{

labels:["Sen","Sel","Rab","Kam","Jum","Sab","Min"],

datasets:[{

label:"Reservasi",

data:[8,12,10,15,18,20,14],

fill:false,

borderWidth:3,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});



// ============================
// GRAFIK PENDAPATAN
// ============================

new Chart(document.getElementById("pendapatanChart"),{

type:"bar",

data:{

labels:["Sen","Sel","Rab","Kam","Jum","Sab","Min"],

datasets:[{

label:"Pendapatan",

data:[1200000,1500000,1800000,2000000,1750000,2500000,1900000],

borderWidth:1

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});

// ===================================
// DASHBOARD FIREBASE
// ===================================

async function loadDashboard(){

    const snapshot = await getDocs(collection(db,"reservasi"));

    const reservasi = snapshot.docs.map(doc=>doc.data());



    // ==========================
    // TOTAL RESERVASI
    // ==========================

    document.getElementById("totalReservasi").innerHTML =
    reservasi.length;



    // ==========================
    // TOTAL PELANGGAN
    // ==========================

    const pelanggan = new Set();

    reservasi.forEach(item=>{

        pelanggan.add(item.wa);

    });

    document.getElementById("totalPelanggan").innerHTML =
    pelanggan.size;



    // ==========================
    // TOTAL PENDAPATAN
    // ==========================

    let total = 0;

    reservasi.forEach(item=>{

        let harga = item.harga
        .replace("Rp","")
        .replace(/\./g,"")
        .replace(/,/g,"")
        .trim();

        total += Number(harga);

    });

    document.getElementById("totalPendapatan").innerHTML =
    "Rp " + total.toLocaleString("id-ID");



    // ==========================
    // KEHADIRAN TERAPIS
    // ==========================

    const daftarTerapis = new Set();

    reservasi.forEach(item=>{

        daftarTerapis.add(item.terapis);

    });

    document.getElementById("kehadiran").innerHTML =
    daftarTerapis.size + " / " + daftarTerapis.size;

}

loadDashboard();
