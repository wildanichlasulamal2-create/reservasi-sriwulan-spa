const treatment = document.getElementById("treatment");
const harga = document.getElementById("harga");
const form = document.getElementById("bookingForm");

const daftarHarga = {
    "Massage Relax": "150000",
    "Facial Treatment": "120000",
    "Body Scrub": "175000"
};

treatment.addEventListener("change", function () {
    harga.value = "Rp " + daftarHarga[this.value];
});

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Ambil data lama
    let reservasi = JSON.parse(localStorage.getItem("reservasi")) || [];

    // Jika masih format lama (object), ubah jadi array
    if (!Array.isArray(reservasi)) {
        reservasi = [reservasi];
    }

    // Nomor booking otomatis
    const nomorUrut = reservasi.length + 1;

    const nomorBooking =
        "SRS-" +
        new Date().getFullYear() +
        String(nomorUrut).padStart(3, "0");

    let dataBooking = {

        booking: nomorBooking,

        nama: document.getElementById("nama").value,

        treatment: document.getElementById("treatment").value,

        harga: document.getElementById("harga").value,

        terapis: document.getElementById("terapis").value,

        tanggal: document.getElementById("tanggal").value,

        jam: document.getElementById("jam").value,

        wa: document.getElementById("whatsapp").value,

        status: "🟡 Menunggu"

    };

    // Tambahkan ke array
    reservasi.push(dataBooking);

    // Simpan kembali
    localStorage.setItem(
        "reservasi",
        JSON.stringify(reservasi)
    );

    alert(
        "Reservasi berhasil dibuat\nNomor Booking : " +
        nomorBooking
    );

    window.location.href = "/reservasi-sriwulan-spa/cek-reservasi.html";

});
