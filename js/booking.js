// ========================
// ELEMENT
// ========================

const treatment = document.getElementById("treatment");
const harga = document.getElementById("harga");
const form = document.getElementById("bookingForm");



// ========================
// DAFTAR HARGA
// ========================

const daftarHarga = {

    "Massage Relax": "150000",

    "Facial Treatment": "120000",

    "Body Scrub": "175000"

};



// ========================
// OTOMATIS HARGA TREATMENT
// ========================

treatment.addEventListener("change", function () {

    harga.value = "Rp " + daftarHarga[this.value];

});



// ========================
// SUBMIT RESERVASI
// ========================

form.addEventListener("submit", function(e){


    e.preventDefault();



    // Ambil data lama

    let reservasi = JSON.parse(
        localStorage.getItem("reservasi")
    ) || [];



    // Jika data lama bukan array

    if(!Array.isArray(reservasi)){

        reservasi = [reservasi];

    }



    // ========================
    // NOMOR BOOKING OTOMATIS
    // ========================

    const nomorUrut = reservasi.length + 1;


    const nomorBooking =

        "SRS-" +

        new Date().getFullYear() +

        String(nomorUrut).padStart(3,"0");





    // ========================
    // DATA RESERVASI
    // ========================

    let dataBooking = {


        booking: nomorBooking,


        nama: document.getElementById("nama").value,


        wa: document.getElementById("noWa").value,


        treatment: document.getElementById("treatment").value,


        harga: document.getElementById("harga").value,


        terapis: document.getElementById("terapis").value,


        tanggal: document.getElementById("tanggal").value,


        jam: document.getElementById("jam").value,


        status: "🟡 Menunggu"


    };





    // ========================
    // SIMPAN DATA
    // ========================

    reservasi.push(dataBooking);



    localStorage.setItem(

        "reservasi",

        JSON.stringify(reservasi)

    );





    // ========================
    // NOTIFIKASI
    // ========================

    alert(

        "✅ Reservasi berhasil dibuat\n\n" +

        "Nomor Booking : " +

        nomorBooking

    );





    // ========================
    // PINDAH KE CEK RESERVASI
    // ========================

    window.location.href =

    "/reservasi-sriwulan-spa/cek-reservasi.html";


});
