$(document).ready(function(){
    const kamus="kamus.csv?v1";
    const datasetTwitter="datasetTwitters.csv?v11";
    // Inisialisasi
    // Load dataset kamus
        Papa.parse(kamus, {
            download:true,
            header:true,
            complete: function(results) {
                //pengecekan
                $("#proses").click(function(){
                    Swal.fire({
                        title:'Memproses stemming..',
                        onBeforeOpen: () => {
                            Swal.showLoading()
                          }
                    });
                    main(results);//memasukan nilai results load data kamus ke fungsi main program
                });
            }
        });
        // Membuat fungsi pencarian kata dalam kamus csv
    function cari(results,inputKata){//fungsi untuk mencari kata dalam kamus
        if(typeof(results.data.filter(data => data.Kata === inputKata)[0]) !='undefined'){
            return true;//jika kata ditemukan
        }else{
            return false;//jika kata tidak ditemukan
        }
    }
    // Fungsi utama 
    function main(kamus){//passing parameter results dari kamus
        Papa.parse(datasetTwitter, {
            download:true,
            dynamicTyping: true,
            complete: function(results) {
                var jumlahDataset=results.data.length;  //pengecekan jumlah dataset twitter
                for(var i=0;i<jumlahDataset;i++){
                    // tampilkan dataset ke html dengan append jquery
                    appendTweet('dataset',results.data[i][0]);
                    // Preprocessing
                    var tweetData=results.data[i][0];
                        tweetData=tweetData.replace(/[^a-zA-Z ]/g, "");//menghapus spesial karakter
                    var splitKata=tweetData.split(" "); //split kalimat berdasarkan spasi
                    var hasilStemming="";//inisialisasi
                    for(var j=0;j<splitKata.length;j++){
                        // Inisialisasi perhitungan exec time
                        var t0 = performance.now()
                        // Proses 
                        // Proses algoritma disini
                        var kata=splitKata[j];
                        console.log("Asal : "+kata);
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
                        if(kata==kataTemp){//jika tidak terpenuhi, lanjut ke 4a
                            kata=hapusAwalanKedua(kata);
                            var kataTemp3=kata;//simpan di temporary kata dasar
                            console.log("Step 4a : "+kata);
                            kata=hapusAkhiran(kata);
                            console.log("Step 5a : "+kata);
                            // Step pengembangan
                            if(cari(kamus,kata)){//jika kata hasil Step 5a ketemu didalam kamus
                                kata=kata;//berhenti
                            }else{
                                if(cari(kamus,kataTemp3)){//6 periksa kata dasar, jika ada maka berhenti
                                    kata=kataTemp3;
                                }else{//7
                                    kata=kata;
                                }
                            }
                        }else{
                            kata=hapusAkhiran(kata);
                            console.log("Step 4b : "+kata);
                            if(kata==kataTemp2){//jika tidak terpenuhi
                                kata=kata;
                            }else{
                                var kataTemp3=kata;
                                kata=hapusAwalanKedua(kata);
                                console.log("Step 5b : "+kata);
                                // Step pengembangan
                                if(cari(kamus,kata)){//jika kata hasil Step 5b didalam kamus
                                    kata=kata;
                                }else{
                                    if(cari(kamus,kataTemp3)){//6 periksa kata dasar, jika ada maka berhenti
                                        kata=kataTemp3;
                                    }else{
                                        kata=kata;
                                    }
                                }
                            }
                        }
                        hasilStemming=hasilStemming+" "+kata;
                        var t1 = performance.now()
                        console.log("Hasil : "+kata);
                        var totalTimeResult=t1-t0;
                        // console.log(splitKata[j]+": "+cari(kamus,splitKata[j]));
                    }
                    appendTweet('result',hasilStemming,totalTimeResult);
                    console.log('NEXT');
                }
                $("#proses").text("Ulangi Proses");
                Swal.close();

            }
        });
    }

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
                inputKata=inputKata.slice(3,inputKata.length); //buang partikel 3 karakter pertama
                inputKata="p"+inputKata;//awalan diganti dengan p * contoh : memukul = pukul
                return inputKata;
            }else if((huruf_awalan_3=='men' && huruf_vokal.indexOf(hurufAwal)!==-1) || (huruf_awalan_3=='pen' && huruf_vokal.indexOf(hurufAwal)!==-1)){
                inputKata=inputKata.slice(3,inputKata.length); //buang partikel 3 karakter pertama
                inputKata="t"+inputKata;//awalan diganti dengan p * contoh : memukul = pukul
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

    // Tampilan twitter
    function appendTweet(jenis,data,totalTime){
        if(jenis=='dataset'){
            var username="@indiHome";
            var nama="IndiHome";
            var id="#dataset-view";
            var avatarClass="Avatar-indihome";
            var time="-";
        }else{
            var username="@hasil";
            var nama="Hasil Stemming";
            var id="#result-view";
            var avatarClass="Avatar";
            var time=(Math.round(totalTime * 100) / 100).toFixed(2)+"ms";

        }
        $(id).append('<div class="tw-block-parent">'
                    +'<div class="timeline-TweetList-tweet">'
                      +'<div class="timeline-Tweet">'
                        +'<div class="timeline-Tweet-brand">'
                          +'<div class="Icon Icon--twitter"></div>'
                        +'</div>'
                        +'<div class="timeline-Tweet-author">'
                          +'<div class="TweetAuthor"><a class="TweetAuthor-link" href="#channel"> </a><span class="TweetAuthor-avatar">'
                              +'<div class="'+avatarClass+'"> </div></span><span class="TweetAuthor-name">'+nama+'</span><span class="Icon Icon--verified"> </span><span class="TweetAuthor-screenName">'+username+'</span></div>'
                        +'</div>'
                        +'<div class="timeline-Tweet-text">'+data+'</div>'
                        +'<div class="timeline-Tweet-metadata"><span class="timeline-Tweet-timestamp">'+time+'</span></div>'
                        +'<ul class="timeline-Tweet-actions">'
                          +'<li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>'
                        +'</ul>'
                      +'</div>'
                    +'</div>'
                  +'</div>');
    }

});