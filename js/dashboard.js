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
