const treatment=document.getElementById("treatment");

const harga=document.getElementById("harga");

treatment.addEventListener("change",()=>{

switch(treatment.value){

case "Massage Relax":

harga.value="Rp150.000";

break;

case "Facial Treatment":

harga.value="Rp120.000";

break;

case "Body Scrub":

harga.value="Rp175.000";

break;

default:

harga.value="";

}

});
