# Stemming Porter

Algoritma porter ditemukan pertama kali oleh Martin Porter (1980), digunakan untuk proses stemming bahasa inggris. Algoritma tersebut kemudian dikembangkan oleh W.B. Frakes pada tahun 1992 untuk diimplemetasikan pada bahasa indonesia.


# Requirements
1.JQuery
2.Papa Parse (CSV Reader JS)
3.Swal JS
4.Dataset

## Papa Parse Init 

    const kamus="kamus.csv";
    // Inisialisasi 
    // Load dataset kamus 
	    Papa.parse(kamus, { 
		    download:true, 
		    header:true, 
		    complete: function(results) { //pengecekan 
		    console.log(result)
	    } 
    });

## Algoritma
#### Algoritma Porter

Langkah langkah algoritma Porter

1.  Menghapus Partikel
2.  Menghapus Kata ganti (Possesive Pronoun)
3.  Hapus awalan pertama. Jika tidak ada lanjutkan ke langkah 4a, jika ada cari maka lanjutkan ke langkah 4b.
4.  a.Hapus awalan kedua, lanjutkan ke langkah 5a  
    b.Hapus akhiran, jika tidak ditemukan maka kata tersebut diasumsikan sebagai root word. Jika ditemukan maka lanjutkan ke langkah 5b.
5.  a.Hapus akhiran, jika kata dasar ditemukan dalam kamus maka langkah berhenti, jika belum maka lanjut ke langkah 6  
    b.Hapus awalan ke-2, kata dasar ditemukan dalam kamus maka langkah berhenti, jika belum maka lanjut ke langkah 6
6.  periksa kata dasar jika ada dalam kamus maka berhenti

