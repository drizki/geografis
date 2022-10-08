const geografis = require('../src/main.js');

test('getCityBySlug should return object', () => {
    const city = geografis.getCityBySlug('jawa-barat/kota-bandung');
    expect(typeof city).toBe('object');
})

test('getCityBySlug should return correct city', () => {
    const city = geografis.getCityBySlug('jawa-barat/kota-bandung');
    expect(city.city).toBe('Kota Bandung');
})

test('getCityBySlug should return empty object if slug is not found', () => {
    const city = geografis.getCityBySlug('jawa-barat/kota');
    expect(city).toEqual({});
})

test('getCityBySlug should throw error "Parameter slug is required"', () => {
    expect(() => geografis.getCityBySlug()).toThrow('Parameter slug is required');
})

test('getCityBySlug should throw error "Parameter slug must be string"', () => {
    expect(() => geografis.getCityBySlug(11)).toThrow('Parameter slug must be string');
})