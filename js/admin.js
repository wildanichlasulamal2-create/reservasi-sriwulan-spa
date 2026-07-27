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



let reservasi = [];



// ========================
// LOAD DATA FIREBASE
// ========================

async function loadReservasi(){

    const snapshot = await getDocs(
        collection(db,"reservasi")
    );


    reservasi = [];


    snapshot.forEach((item)=>{

        reservasi.push({

            id:item.id,

            ...item.data()

        });

    });


    updateDashboard();

    tampilkanData(reservasi);

}





// ========================
// DASHBOARD
// ========================

function updateDashboard(){


document.getElementById("totalReservasi").innerHTML =
reservasi.length;


document.getElementById("menunggu").innerHTML =
reservasi.filter(r=>r.status.includes("Menunggu")).length;


document.getElementById("dikonfirmasi").innerHTML =
reservasi.filter(r=>r.status.includes("Dikonfirmasi")).length;


document.getElementById("selesai").innerHTML =
reservasi.filter(r=>r.status.includes("Selesai")).length;


}





// ========================
// TAMPILKAN DATA
// ========================

function tampilkanData(data){


let html = `

<table class="table-admin">

<tr>

<th>No</th>
<th>No Booking</th>
<th>Nama</th>
<th>No WhatsApp</th>
<th>Treatment</th>
<th>Tanggal</th>
<th>Jam</th>
<th>Terapis</th>
<th>Status</th>
<th>Aksi</th>

</tr>

`;



data.forEach((item,index)=>{


html += `

<tr>

<td>${index+1}</td>

<td>${item.booking}</td>

<td>${item.nama}</td>

<td>${item.wa}</td>

<td>${item.treatment}</td>

<td>${item.tanggal}</td>

<td>${item.jam}</td>

<td>${item.terapis}</td>

<td>${item.status}</td>


<td>


<button onclick="detailReservasi(${index})">
📋 Detail
</button>


<button onclick="konfirmasi('${item.id}')">
🟢 Konfirmasi
</button>


<button onclick="selesai('${item.id}')">
✅ Selesai
</button>


<button onclick="kirimWA(${index})">
📱 Chat WA
</button>


<button class="btn-hapus-kecil" onclick="hapusReservasi('${item.id}')">
🗑️
</button>


</td>


</tr>

`;

});


html += "</table>";


document.getElementById("dataBooking").innerHTML = html;


}







// ========================
// UPDATE STATUS
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







// ========================
// DETAIL
// ========================

window.detailReservasi = function(index){


let data = reservasi[index];


alert(

"📋 DETAIL RESERVASI\n\n"+

"🔖 Booking : "+data.booking+"\n"+

"👤 Nama : "+data.nama+"\n"+

"📱 WhatsApp : "+data.wa+"\n"+

"💆 Treatment : "+data.treatment+"\n"+

"💰 Harga : "+data.harga+"\n"+

"👩 Terapis : "+data.terapis+"\n"+

"📅 Tanggal : "+data.tanggal+"\n"+

"🕒 Jam : "+data.jam+"\n"+

"📌 Status : "+data.status

);


}







// ========================
// WHATSAPP
// ========================

window.kirimWA = function(index){


let data = reservasi[index];


let nomor = data.wa.replace(/^0/,"62");


let pesan =

"Halo Kak "+data.nama+
", kami dari Sriwulan Spa 😊\n\n"+

"Detail Reservasi:\n"+

"🔖 Booking : "+data.booking+"\n"+

"💆 Treatment : "+data.treatment+"\n"+

"💰 Harga : "+data.harga+"\n"+

"👩 Terapis : "+data.terapis+"\n"+

"📅 Tanggal : "+data.tanggal+"\n"+

"🕒 Jam : "+data.jam+"\n\n"+

"Terima kasih telah memilih Sriwulan Spa 🌸";


window.open(

"https://wa.me/"+nomor+
"?text="+encodeURIComponent(pesan),

"_blank"

);


}







// ========================
// SEARCH
// ========================

window.cariReservasi=function(){


let keyword =
document.getElementById("cariBooking")
.value.toLowerCase();



let hasil = reservasi.filter(item=>

item.booking.toLowerCase().includes(keyword)

||

item.nama.toLowerCase().includes(keyword)

);



tampilkanData(hasil);


}







// ========================
// FILTER
// ========================

window.filterStatus=function(){


let status =
document.getElementById("filterStatus").value;



if(status==""){

tampilkanData(reservasi);

return;

}



let hasil = reservasi.filter(item=>

item.status.includes(status)

);



tampilkanData(hasil);


}






// MULAI
loadReservasi();
