const hari = new Date();

document.getElementById("tanggal").innerHTML =
hari.toLocaleDateString("id-ID",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});
