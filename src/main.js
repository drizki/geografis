const fs = require('fs');  
const utils = require('./utils.js'); 
const elasticlunr = require('elasticlunr');

const geografis = {
    data: JSON.parse(fs.readFileSync(__dirname + '/../data/json/data.json', 'utf8')),
    collection: JSON.parse(fs.readFileSync(__dirname + '/../data/json/collection.json', 'utf8')),
    index () {
        const stopwords = [
            "desa", "dusun", "kelurahan", "kecamatan", "kota", "kabupaten", "provinsi",
            "ds", "dus", "kel", "kec", "kot", "kab", "prov", "kode", "pos", "kodepos",
            "daerah", "jalan", "jl", "jln", "rt", "rw"
        ]
        elasticlunr.clearStopWords();
        elasticlunr.addStopWords(stopwords);
        const fields = ["code", "postal", "village", "district", "city"];
        const elastic = elasticlunr(function () {
            fields.forEach(field => this.addField(field)); 
            this.setRef("postal");
        });
        this.data.forEach(item => elastic.addDoc(item));
        return elastic;
    },
    
    /**
     * Dumps all data
     * @returns {Array} Array of all villages
     * @example
     * const data = geografis.dump()
     */
    dump() { 
        return this.data;
    },

    /**
     * Search for code, postal, village, district, city, or province
     * @param {string} query search query
     * @param {number} limit limit the number of results
     * @param {number} offset offset the number of results
     * @returns {object} containing results count and data array
     * @throws {Error} if query is not string
     * @throws {Error} if query is empty
     * @example 
     * const search = geografis.search('ciumbuleuit'); 
     */
    search(query, limit = 10, offset = 0, useIndex = false) {
        if (!query) throw new Error('Parameter query is required');
        if (typeof query !== 'string') throw new Error('Parameter query must be string');
        if (limit && typeof limit !== 'number') throw new Error('Parameter limit must be number');
        if (offset && typeof offset !== 'number') throw new Error('Parameter offset must be number');
        if (limit <= 0) throw new Error('Parameter limit must be greater than 0');
        if (offset && offset < 0) throw new Error('Parameter offset can not be negative number');

        if (useIndex) {
            const elastic = this.index();
            let results = []; 

            const search = elastic.search(query, {fields: {village: {boost: 2}, district: {boost: 1.5}, city: {boost: 1}, postal: {boost: 2}, code: {boost: 2}}});
            search.forEach(item => results.push(this.data.find(i => i.postal === Number(item.ref))));
            
            const count = results.length;
            results = results.slice(offset, offset + limit);

            return {count: count, limit, offset, data: results};
        }

        let results = this.data.filter(item => {
            // search object keys and values for query
            return Object.keys(item).some(key => {
                if (item[key]) {
                    return item[key].toString().toLowerCase().includes(query.toLowerCase());
                }
            });
        });

        const count = results.length;
        results = results.slice(offset, offset + limit);

        return {count: count, limit, offset, data: results};
    },

    /**
     * Get province list
     * @returns {Array} of provinces 
     * @example
     * const provinces = geografis.provinces();
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
     * @returns {object} containing province code, province name, and slug
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
     * Get province by slug
     * @param {string} slug province slug
     * @returns {object} containing province code, province name, slug, and cities
     * @throws {Error} if parameter slug is not string
     * @throws {Error} if parameter slug is not provided
     * @example
     * const province = geografis.getProvinceBySlug('jawa-barat');
     */
    getProvinceBySlug(slug) {
        if (!slug) throw new Error('Parameter slug is required');
        if (typeof slug !== 'string') throw new Error('Parameter slug must be string');

        const search = this.collection.filter(item => item.slug == slug)[0];
        if (!search) return {};
 
        return {
            code: search.code,
            province: search.province,
            cities: search.cities.map(item => {
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
     * @returns {object} containing city code, city name, slug, and districts
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
            province: province.province,
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
     * Get city by slug
     * @param {string} slug city slug
     * @returns {object} containing city code, city name, slug, and districts 
     * @throws {Error} if parameter slug is not string
     * @throws {Error} if parameter slug is not provided
     * @example 
     * const city = geografis.getCityBySlug('jawa-barat/kota-bandung');
     */
    getCityBySlug(slug) {
        if (!slug) throw new Error('Parameter slug is required');
        if (typeof slug !== 'string') throw new Error('Parameter slug must be string');

        const province = this.collection.filter(item => item.cities.filter(item => item.slug == slug).length > 0)[0];
        if (!province) return {};

        const city = province.cities.filter(item => item.slug == slug)[0];
        if (!city) return {};

        return {
            code: city.code,
            city: city.city,
            province: province.province,
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
     * @returns {object} containing district code, district name, and slug
     * @throws {Error} if district not found
     * @throws {Error} if parameter code is not string
     * @throws {Error} if parameter code is not provided
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
            city: city.city,
            province: province.province,
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
     * Get district by slug
     * @param {string} slug district slug
     * @returns {object} containing district code, district name, and slug
     * @throws {Error} if parameter slug is not string
     * @throws {Error} if parameter slug is not provided
     * @example
     * const district = geografis.getDistrictBySlug('jawa-barat/kota-bandung/cibeunying-kaler');
     */
    getDistrictBySlug(slug) {
        if (!slug) throw new Error('Parameter slug is required');
        if (typeof slug !== 'string') throw new Error('Parameter slug must be string');

        const province = this.collection.filter(item => item.cities.filter(item => item.districts.filter(item => item.slug == slug).length > 0).length > 0)[0];
        if (!province) return {};

        const city = province.cities.filter(item => item.districts.filter(item => item.slug == slug).length > 0)[0];
        if (!city) return {};

        const district = city.districts.filter(item => item.slug == slug)[0];
        if (!district) return {};

        return {  
            code: district.code,
            district: district.district,
            city: city.city,
            province: province.province,
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
     * @returns {object} containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
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
     * Get village by slug
     * @param {string} slug village slug
     * @returns {object} containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
     * @throws {Error} if parameter slug is not string
     * @throws {Error} if parameter slug is not provided
     * @example
     * const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cibeunying-kaler/cibeunying-kaler');
     */
    getVillageBySlug(slug) {
        if (!slug) throw new Error('Parameter slug is required');
        if (typeof slug !== 'string') throw new Error('Parameter slug must be string');

        const village = this.data.find(item => item.slug == slug)
        if (!village) return {};
        return village;
    },

    /**
     * Get village by postal code
     * @param {number} postalCode postal code
     * @returns {object} containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
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
     * @returns {object} containing village code, postal code, village name, slug, latitude, longitude, elevation, and geometry
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
     * @returns {object} in GEOJSON format
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