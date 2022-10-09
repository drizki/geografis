const geografis = require('../src/main.js');


test('geografis.getVillageBySlug should return object', () => {
    const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/ciumbuleuit');
    expect(typeof village).toBe('object');
})

test('geografis.getVillageBySlug should return object with key "village"', () => {
    const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/ciumbuleuit');
    expect(village).toHaveProperty('village');
}) 

test('geografis.getVillageBySlug should return correct village name', () => {
    const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/ciumbuleuit');
    expect(village.village).toBe('Ciumbuleuit');
})

test('geografis.getVillageBySlug should return correct district name', () => {
    const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/ciumbuleuit');
    expect(village.district).toBe('Cidadap');
})

test('geografis.getVillageBySlug should return empty object', () => {
    const village = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/ciumbuleuit-2');
    expect(village).toEqual({});
})

test('geografis.getVillageBySlug should throw error "Parameter slug is required"', () => {
    expect(() => geografis.getVillageBySlug()).toThrow('Parameter slug is required');
})

test('geografis.getVillageBySlug should throw error "Parameter slug must be string"', () => {
    expect(() => geografis.getVillageBySlug(123)).toThrow('Parameter slug must be string');
})