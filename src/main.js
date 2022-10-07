const fs = require('fs');  
const utils = require('./utils.js'); 

const geografis = {
    data: JSON.parse(fs.readFileSync(__dirname + '/../data/json/data.json', 'utf8')),
    collection: JSON.parse(fs.readFileSync(__dirname + '/../data/json/collection.json', 'utf8')),

    /**
     * Dumps all data
     * @returns {Array} Array of all villages
     */
    dump() { 
        return this.data;
    },

    /**
     * Dumb search for code, postal, village, district, city, or province
     * @param {string} query search query
     * @returns object containing results count and data array
     * @throws {Error} if query is not string
     * @throws {Error} if query is empty
     * @example
     * const geografis = require('geografis');
     * const search = geografis.search('ciumbuleuit'); 
     */
    search(query) {
        if (!query) throw new Error('Parameter query is required');
        if (typeof query !== 'string') throw new Error('Parameter query must be string');
 
        query = query.toString().toLowerCase();  
        const tmp = [];
        
        for (let i = 0; i < this.data.length; i++) {
            for (let k in this.data[i]) {
                if (!this.data[i].hasOwnProperty(k) || !this.data[i][k]) continue;
                if (this.data[i][k].toString().toLowerCase().indexOf(query) >= 0) {
                    if (tmp.indexOf(this.data[i]) < 0) tmp.push(this.data[i]);
                } 
            }
        }
        
        const results = { count: 0, data: [] };
        results.count = tmp.length;
        results.data = tmp; 
        return results; 
    },

    /**
     * Get province list
     * @returns array of provinces 
     */
    getProvinces() {
        return this.collection.map(item => {
            return {
                code: item.code,
                province: item.province,
                slug: item.slug,
            }
        }); 
    },

    /**
     * Get province by code
     * @param {string} code province code
     * @returns object containing province code, province name, and slug
     * @throws {Error} if province not found
     * @throws {Error} if parameter code is not string
     * @throws {Error} if parameter code is not provided
     * @example
     * const province = geografis.getProvince('32');
     */
    getProvince(code) {
        if (!code) throw new Error('Parameter code is required');
        if (typeof code !== 'string') throw new Error('Parameter code must be string');

        const search = this.collection.filter(item => item.code == code)[0];
        if (!search) return {};
 
        return {
            code: search.code,
            province: search.province,
            cities:search.cities.map(item => {
                return {
                    code: item.code,
                    city: item.city,
                    slug: item.slug
                }
            }) 
        }
    },

    /**
     * Get city by code
     * @param {string} code city code
     * @returns object containing city code, city name, slug, and districts
     * @throws {Error} if city not found
     * @throws {Error} if parameter code is not string
     * @throws {Error} if parameter code is not provided
     * @example
     * const city = geografis.getCity('11.01');
     */
    getCity(code) {
        if (!code) throw new Error('Parameter code is required');
        if (typeof code !== 'string') throw new Error('Parameter code must be string');

        const province = this.collection.filter(item => item.code == code.substring(0, 2))[0]; 
        if (!province) return {};

        const city = province.cities.filter(item => item.code == code)[0]
        if (!city) return {};

        return {
            code: city.code,
            city: city.city,
            slug: city.slug,
            districts: city.districts.map(item => {
                return {
                    code: item.code,
                    district: item.district,
                    slug: item.slug
                }
            })
        }; 
    },

    /**
     * Get district by code
     * @param {string} code district code
     * @returns object containing district code, district name, and slug
     * @throws error if district not found
     * @throws error if parameter code is not string
     * @throws error if parameter code is not provided
     * @example
     * const district = geografis.getDistrict('11.01.01');
     */
    getDistrict(code) {
        if (!code) throw new Error('Parameter code is required');
        if (typeof code !== 'string') throw new Error('Parameter code must be string');

        const province = this.collection.filter(item => item.code == code.substring(0, 2))[0]; 
        if (!province) return {};

        const city = province.cities.filter(item => item.code == code.substring(0, 5))[0]
        if (!city) return {};

        const district = city.districts.filter(item => item.code == code)[0]
        if (!district) return {};

        return {  
            code: district.code,
            district: district.district,
            slug: district.slug,
            villages: district.villages.map(item => {
                return {
                    code: item.code, 
                    village: item.village,
                    slug: item.slug
                }
            })
        };
    },
    
    /**
     * Get village by code
     * @param {string} code village code
     * @returns object containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
     * @throws {Error} if village not found
     * @throws {Error} if parameter code is not string
     * @throws {Error} if parameter code is not provided
     * @example
     * const village = geografis.getVillage('11.01.01.1001');
     */
    getVillage(code) {
        if (!code) throw new Error('Parameter code is required');
        if (typeof code !== 'string') throw new Error('Parameter code must be string');

        const village = this.data.find(item => item.code == code)
        if (!village) return {};
        return village;
    },

    /**
     * Get village by postal code
     * @param {number} postalCode postal code
     * @returns object containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
     * @throws {Error} if parameter postalCode is not number
     * @throws {Error} if parameter postalCode is not provided
     * @example
     * const village = geografis.getVillageByPostalCode(11110);
     */
    getVillageByPostalCode(postalCode) {
        if (!postalCode) throw new Error('Parameter postalCode is required');
        if (typeof postalCode !== 'number') throw new Error('Parameter postalCode must be number');

        const village = this.data.filter(item => item.postal == postalCode)
        if (!village.length) return [];
        return [...village];
    },

    /**
     * Get nearest village by latitude and longitude
     * @param {number} latitude latitude
     * @param {number} longitude longitude
     * @returns object containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
     * @throws {Error} if parameter latitude is not number
     * @throws {Error} if parameter latitude is not provided
     * @throws {Error} if parameter longitude is not number
     * @throws {Error} if parameter longitude is not provided
     * @example
     * const village = geografis.getNearest(-6.175392, 106.827153);
     */
    getNearest(latitude, longitude) {
        if (!latitude || !longitude) throw new Error('Parameter latitude and longitude is required');
        if (typeof latitude !== 'number' || typeof longitude !== 'number') throw new Error('Parameter latitude and longitude must be number');
 
        const tmp = [];

        for (let i = 0; i < this.data.length; i++) {
            const distance = utils.calculateDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: this.data[i].latitude, longitude: this.data[i].longitude }
            );
            tmp.push({
                code: this.data[i].code,
                village: this.data[i].village,
                distance: distance
            });
        }

        tmp.sort((a, b) => a.distance - b.distance); 
        return this.data.filter(item => item.code == tmp[0].code)[0]; 
    },

    /**
     * Get village geometry by village code, if any
     * @param {string} code village code
     * @param {string} geoJsonDir geojson directory
     * @returns object in GEOJSON format
     * @throws {Error} if village not found
     * @throws {Error} if parameter code is not string
     * @throws {Error} if parameter code is not provided
     * @example
     * const geometry = geografis.getVillageGeometry('11.01.01.1001');
     */
    getGeometry(code, geoJsonDir) {
        if (!code) throw new Error('Parameter code is required');
        if (typeof code !== 'string') throw new Error('Parameter code must be string');

        if (!geoJsonDir) throw new Error('Parameter geoJsonDir is required');

        const village = this.data.find(item => item.code == code)
        if (!village || !village.geometry) return {};
 
        const geojson = JSON.parse(fs.readFileSync(`${geoJsonDir}/${code}.json`))
        geojson.properties = village
        return geojson; 
    },
}

module.exports = geografis;