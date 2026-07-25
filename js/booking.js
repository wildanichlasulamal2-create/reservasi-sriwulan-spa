const treatment = document.getElementById("treatment");
const harga = document.getElementById("harga");
const form = document.getElementById("bookingForm");


const daftarHarga = {
    "Massage Relax":"150000",
    "Facial Treatment":"120000",
    "Body Scrub":"175000"
};


treatment.addEventListener("change", function(){

    harga.value = "Rp " + daftarHarga[this.value];

});



form.addEventListener("submit", function(e){

    e.preventDefault();


    let nomorBooking =
    "SPA" + Math.floor(100000 + Math.random()*900000);



    let dataBooking = {

        booking : nomorBooking,

        nama :
        document.getElementById("nama").value,

        treatment :
        document.getElementById("treatment").value,

        harga :
        document.getElementById("harga").value,

        terapis :
        document.getElementById("terapis").value,

        tanggal :
        document.getElementById("tanggal").value,

        jam :
        document.getElementById("jam").value,

        status :
        "Menunggu Konfirmasi"

    };


    localStorage.setItem(
        "reservasi",
        JSON.stringify(dataBooking)
    );


    alert(
        "Reservasi berhasil dibuat\nNomor Booking: "
        + nomorBooking
    );


    window.location.href="konfirmasi.html";


});
