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
