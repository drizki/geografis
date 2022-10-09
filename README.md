# Geografis

Sebuah modul Node.js yang mengandung data kode wilayah desa/kelurahan, kecamatan, kabupaten/kota, provinsi, kode pos, koordinat, elevasi, dan geometri area seluruh Indonesia. Data yang terdapat dalam repository ini sesuai dengan Peraturan Menteri Dalam Negeri No. 72 Tahun 2019 dan Peraturan Menteri Dalam Negeri No. 146.1-4717 Tahun 2020.


[![npm version](https://badge.fury.io/js/geografis.svg?v=1.2.0)](https://badge.fury.io/js/geografis) ![Downloads](https://img.shields.io/npm/dt/geografis.svg) ![License MIT](https://img.shields.io/npm/l/geografis.svg) 

## Instalasi
Anda dapat menggunakan modul ini pada lingkungan Node.js (tidak untuk browser) dengan cara sebagai berikut:
```bash
npm install geografis
```
Jika Anda menggunakan Yarn:
```bash
yarn add geografis
```

## Struktur Data
Setiap entri mengandung data yang terdiri atas nama kelurahan/desa, kecamatan, kabupaten/kota, provinsi, latitude, longitude, elevasi, kode pos, geometri (GeoJSON, beberapa tidak tersedia) dan Kode Wilayah. Pustaka ini mengandung 83,449 jumlah entri. Berikut ini adalah contoh keluaran data:

```json
  {
    "code": "31.71.01.1001",
    "postal": 10110,
    "slug": "dki-jakarta/kota-administrasi-jakarta-pusat/gambir/gambir",
    "province": "DKI Jakarta",
    "city": "Kota Administrasi Jakarta Pusat",
    "district": "Gambir",
    "village": "Gambir",
    "latitude": -6.176262870636918,
    "longitude": 106.82932428386471,
    "elevation": 5,
    "geometry": true
  },
```

|Key|Keterangan|
|---|---|
|code|Kode wilayah|
|postal|Kode pos dari wilayah tersebut|
|slug|Slug untuk wilayah tersebut|
|province|Nama Provinsi|
|city|Nama Kota/Kabupaten|
|district|Nama Kecamatan|
|village|Nama Desa/Kelurahan|
|latitude|Latitude dari wilayah|
|longitude|Longitude dari wilayah|
|elevation|Elevasi wilayah dalam meter|
|geometry|Apakah wilayah memiliki file geometri poligon|


Anda dapat melihat data lengkapnya [di sini](https://github.com/drizki/geografis-data).

## Penggunaan
Lihat file examples.js dalam folder examples untuk contoh penggunaan.

### getGeometry
Untuk menggunakan fungsi getGeometry, Anda harus mengunduh data geojson yang terdapat di [repository ini](https://github.com/drizki/geografis-data). Simpan di dalam direktori: project_anda / data / geojson.

## Test
Unduh modul ini dan jalankan:
```bash
yarn test
```

## Berkontribusi
Gunakan fitur Issues jika ada masalah, ada pertanyaan, atau kirimkan Pull Request jika ingin berkontribusi. Anda juga dapat mentranslasikan pustaka kode ini ke bahasa pemrograman yang lain.

## Lisensi
SUMBER KODE YANG TERDAPAT DALAM REPOSITORY INI BERLISENSI [MIT](https://opensource.org/licenses/MIT), TIDAK TERDAPAT JAMINAN DARI PEMBUAT KODE UNTUK MEMASTIKAN KEAKURATAN, KUALITAS, DAN KETERSEDIAAN. DIMOHON TIDAK MEMPERJUALBELIKAN DATA YANG TERDAPAT DALAM REPOSITORY INI UNTUK KEPENTINGAN PRIBADI DAN GUNAKANLAH DENGAN BIJAK.

Sumber kode dibuat untuk pembelajaran karena sulitnya memperoleh informasi area yang komprehensif serta akurat di Indonesia yang terbuka dan bebas digunakan.


### Sumber
Data diperoleh dan telah diproses secara otomatis dan manual dari berbagai sumber.
1. [Wilayah](https://github.com/cahyadsn/wilayah)
2. [Kebijakan Satu Peta](https://satupeta.go.id)
3. [Open Elevation](https://open-elevation.com)
4. [OSM](https://www.openstreetmap.org)
5. [Nomor](https://nomor.net)


Star repository ini jika bermanfaat ya ges ya 🇮🇩