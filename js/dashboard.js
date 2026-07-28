const hari = new Date();

document.getElementById("tanggal").innerHTML =
hari.toLocaleDateString("id-ID",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});

document.getElementById("totalReservasi").innerHTML = 24;

document.getElementById("totalPendapatan").innerHTML = "Rp2.450.000";

document.getElementById("totalPelanggan").innerHTML = 126;

document.getElementById("kehadiran").innerHTML = "8 / 10";
