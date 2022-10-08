const geografis = require('../src/main.js');
// const geografis = require('geografis'); -- uncomment this line if you want to test the package from npm/yarn & comment above line

const dump          = geografis.dump();
const search        = geografis.search('ciumbuleuit');
const provinces     = geografis.getProvinces();
const province      = geografis.getProvince('32');
const provinceSlug  = geografis.getProvinceBySlug('jawa-barat');
const city          = geografis.getCity('32.73');
const citySlug      = geografis.getCityBySlug('jawa-barat/kota-bandung');
const district      = geografis.getDistrict('32.73.08');
const districtSlug  = geografis.getDistrictBySlug('jawa-barat/kota-bandung/cidadap');
const village       = geografis.getVillage('32.73.08.1002');
const postal        = geografis.getVillageByPostalCode(40142);
const nearest       = geografis.getNearest(-6.8822007,107.6142733);
const geometry      = geografis.getGeometry('32.73.08.1002', 'data/geojson');

console.log('Dump data', dump);
console.log('Search ciumbuleuit', search);
console.log('All provinces', provinces);
console.log('Province 32', province);
console.log('Province by slug', provinceSlug);
console.log('City 32.73', city);
console.log('City by slug', citySlug);
console.log('District 32.73.08', district); 
console.log('District by slug', districtSlug);
console.log('Village 32.73.08.1002', village);
console.log('Village with postal 40142', postal);
console.log('Nearest -6.8822007, 107.6142733', nearest);
console.log('Geometry 32.73.08.1002', geometry); 