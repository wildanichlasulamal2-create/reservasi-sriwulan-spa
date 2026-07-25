const treatment=document.getElementById("treatment");
const harga=document.getElementById("harga");
const form=document.getElementById("bookingForm");

const daftarHarga={
"Massage Relax":"Rp150.000",
"Facial Treatment":"Rp120.000",
"Body Scrub":"Rp175.000"
};

treatment.addEventListener("change",()=>{

harga.value=daftarHarga[treatment.value]||"";

});

form.addEventListener("submit",(e)=>{

e.preventDefault();

const booking="SPA"+Date.now().toString().slice(-6);

localStorage.setItem("booking",booking);

window.location.href="konfirmasi.html";

});

document.getElementById("treatment").addEventListener("change", function(){

let harga = this.options[this.selectedIndex].dataset.harga;

document.getElementById("harga").value =
"Rp " + harga;

});



document.getElementById("bookingForm")
.addEventListener("submit", function(e){

e.preventDefault();



let nomorBooking =
"SPA" + Math.floor(100000 + Math.random()*900000);



localStorage.setItem(
"booking",
nomorBooking
);



localStorage.setItem(
"nama",
document.getElementById("nama").value
);



localStorage.setItem(
"treatment",
document.getElementById("treatment").value
);



localStorage.setItem(
"tanggal",
document.getElementById("tanggal").value
);



localStorage.setItem(
"jam",
document.getElementById("jam").value
);



alert(
"Reservasi berhasil dibuat\nNomor Booking: "
+ nomorBooking
);



window.location.href="cek-reservasi.html";


});
