var kata="merusak";
console.log("Asal"+kata);
kata=hapusPartikel(kata);//Step 1
console.log("Step 1 : "+kata);
kata=hapusPossesivePronoun(kata);//Step 2
console.log("Step 2 : "+kata);
var kataTemp=kata;
console.log("kataTemp : "+kataTemp)
kata=hapusAwalanPertama(kata);//Step 3
console.log("Step 3 : "+kata);
var kataTemp2=kata;
console.log("kataTemp2 : "+kataTemp2)
if(kata==kataTemp){//jika tidak terpenuhi
    kata=hapusAwalanKedua(kata);
    console.log("Step 4a : "+kata);
    kata=hapusAkhiran(kata);
    console.log("Step 5a : "+kata);
}else{
    kata=hapusAkhiran(kata);
    console.log("Step 4b : "+kata);
    if(kata==kataTemp2){
        kata=kata;
    }else{
        kata=hapusAwalanKedua(kata);
        console.log("Step 5b : "+kata);
    }
}
console.log("Hasil : "+kata);

// console.log(kata.substr(3,kata.length));
// console.log(hapusAwalanPertama(kata));
// Breakdown fungsi algoritma
// Step 1 hapus partikel -kah -lah -pun
function hapusPartikel(inputKata){
var huruf_akhiran=inputKata.substr(inputKata.length-3).toLowerCase(); //ambil 3 karakter terakhir dan ubah ke lower case
if(huruf_akhiran=='kah' || huruf_akhiran=='lah' || huruf_akhiran=='pun'){
inputKata=inputKata.slice(0,-3); //buang partikel 3 karakter terakhir
return inputKata;
}else{
return inputKata;
}
}

// Step 2 hapus Possesive Pronoun.  -ku -mu -nya
function hapusPossesivePronoun(inputKata){
var huruf_akhiran_2=inputKata.substr(inputKata.length-2).toLowerCase(); //ambil 2 karakter terakhir dan ubah ke lower case
var huruf_akhiran_3=inputKata.substr(inputKata.length-3).toLowerCase(); //ambil 3 karakter terakhir dan ubah ke lower case
if(huruf_akhiran_2=='ku' || huruf_akhiran_2=='mu'){
inputKata=inputKata.slice(0,-2); //buang partikel 2 karakter terakhir
return inputKata;
}else if(huruf_akhiran_3=='nya'){
inputKata=inputKata.slice(0,-3); //buang partikel 3 karakter terakhir
return inputKata;
}else{
return inputKata;
}
}

// Step 3 hapus awalan pertama
function hapusAwalanPertama(inputKata){
var huruf_awalan_4=inputKata.substr(0,4).toLowerCase();
var huruf_awalan_3=inputKata.substr(0,3).toLowerCase();
var huruf_awalan_2=inputKata.substr(0,2).toLowerCase();
var huruf_vokal='aiueo';//inisialisasi huruf vokal
if(huruf_awalan_4=='meng' || huruf_awalan_4=='meny' || huruf_awalan_4=='peng' || huruf_awalan_4=='peny'){
if(huruf_awalan_4=='peny' || huruf_awalan_4=='meny'){
inputKata=inputKata.slice(4,inputKata.length); //buang partikel 4 karakter pertama
inputKata="s"+inputKata;//awalan diganti dengan s * contoh : menyapu = sapu
return inputKata;
}else{
inputKata=inputKata.slice(4,inputKata.length); //buang partikel 4 karakter pertama
return inputKata;
}
}else if(huruf_awalan_3=='men' || huruf_awalan_3=='mem' || huruf_awalan_3=='pen' || huruf_awalan_3=='pem' || huruf_awalan_3=='ter'){
var tempAwalan=inputKata.slice(3,inputKata.length);//memotong input dan disimpan di temporary variable
var hurufAwal=tempAwalan.substr(0,1);//cek huruf awal setelah dipotong
if((huruf_awalan_3=='mem' && huruf_vokal.indexOf(hurufAwal)!==-1) || (huruf_awalan_3=='pem' && huruf_vokal.indexOf(hurufAwal)!==-1)){//cek jika setelah awalan mem dan pem merupakan huruf vokal
inputKata=inputKata.slice(3,inputKata.length); //buang partikel 4 karakter pertama
inputKata="p"+inputKata;//awalan diganti dengan p * contoh : memukul = pukul
return inputKata;
}else{
inputKata=inputKata.slice(3,inputKata.length); //buang partikel 3 karakter pertama
return inputKata;  
}
}else if(huruf_awalan_2=='di' || huruf_awalan_2=='ke' || huruf_awalan_2=='me'){
inputKata=inputKata.slice(2,inputKata.length); //buang partikel 2 karakter pertama
return inputKata;
}else{
return inputKata;//jika tidak masuk aturan, maka lanjutkan
}
}

// Step 4a hapus awalan kedua
function hapusAwalanKedua(inputKata){
var huruf_awalan_3=inputKata.substr(0,3).toLowerCase();
var huruf_awalan_2=inputKata.substr(0,2).toLowerCase();
if(huruf_awalan_3=='ber' || huruf_awalan_3=='bel' || huruf_awalan_3=='per' || huruf_awalan_3=='pel'){
if(huruf_awalan_3=='bel' || huruf_awalan_3=='pel'){
var kataSetelah=inputKata.substr(3,inputKata.length).toLowerCase();//ambil kata setelah awalan bel dan pel
if(kataSetelah=='ajar'){//jika kata setelah = ajar, hilangkan prefix pel/bel
inputKata=inputKata.slice(3,inputKata.length); //buang partikel 3 karakter pertama
return inputKata;  
}else{
return inputKata;//jika tidak memenuhi kondisi, kata tidak diubah.
}
}else{
inputKata=inputKata.slice(3,inputKata.length); //buang partikel 3 karakter pertama
return inputKata;  
}
}else if(huruf_awalan_2=='be' || huruf_awalan_2=='pe'){
inputKata=inputKata.slice(2,inputKata.length); //buang partikel 2 karakter pertama
return inputKata;
}else{
return inputKata;//jika tidak masuk aturan, maka lanjutkan
}
}
// Step 4b hapus akhiran
function hapusAkhiran(inputKata){
var huruf_akhiran_1=inputKata.substr(inputKata.length-1).toLowerCase(); //ambil 2 karakter terakhir dan ubah ke lower case
var huruf_akhiran_2=inputKata.substr(inputKata.length-2).toLowerCase(); //ambil 2 karakter terakhir dan ubah ke lower case
var huruf_akhiran_3=inputKata.substr(inputKata.length-3).toLowerCase(); //ambil 3 karakter terakhir dan ubah ke lower case
if(huruf_akhiran_3=='kan'){
// cek apakah prefix merupakan {ke,peng}
var huruf_awalan_2=inputKata.substr(0,2).toLowerCase();
var huruf_awalan_4=inputKata.substr(0,4).toLowerCase();
if(huruf_awalan_2!='ke' || huruf_awalan_4!='peng'){//prefix bukan anggota ke,peng
inputKata=inputKata.slice(0,-3); //buang akhiran 3 karakter terakhir
return inputKata; 
}else{
return inputKata;
}
}else if(huruf_akhiran_2=='an'){
// cek apakah prefix merupakan {di,ter,meng}
var huruf_awalan_2=inputKata.substr(0,2).toLowerCase();
var huruf_awalan_3=inputKata.substr(0,3).toLowerCase();
var huruf_awalan_4=inputKata.substr(0,4).toLowerCase();
if(huruf_awalan_2!='di' || huruf_awalan_3!='ter' || huruf_awalan_4!='meng'){//huruf bukan anggota di,ter,meng
inputKata=inputKata.slice(0,-2); //buang akhiran 2 karakter terakhir
return inputKata; 
}else{
return inputKata;
}
}else if(huruf_akhiran_1=='i'){
// cek apakah prefix merupakan {ke,ber,peng}
var huruf_awalan_2=inputKata.substr(0,2).toLowerCase();
var huruf_awalan_3=inputKata.substr(0,3).toLowerCase();
var huruf_awalan_4=inputKata.substr(0,4).toLowerCase();
if(huruf_awalan_2!='ke' || huruf_awalan_3!='ber' || huruf_awalan_4!='peng'){//huruf bukan anggota ke,ber,peng
inputKata=inputKata.slice(0,-1); //buang akhiran 1 karakter terakhir
return inputKata; 
}else{
return inputKata;
}
}else{
return inputKata; //kata merupakan root word
}
}