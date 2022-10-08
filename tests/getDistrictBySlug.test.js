const geografis = require('../src/main.js');

test('geografis.getDistrictBySlug should return object', () => {
    const district = geografis.getDistrictBySlug('jawa-barat/kota-bandung/cidadap');
    expect(typeof district).toBe('object');
})

test('geografis.getDistrictBySlug should return correct district', () => {
    const district = geografis.getDistrictBySlug('jawa-barat/kota-bandung/cidadap');
    expect(district.district).toBe('Cidadap');
})

test('geografis.getDistrictBySlug should return empty object if slug is not found', () => {
    const district = geografis.getDistrictBySlug('jawa-barat/kota-bandung/ci');
    expect(district).toEqual({});
})

test('geografis.getDistrictBySlug should throw error "Parameter slug is required"', () => {
    expect(() => geografis.getDistrictBySlug()).toThrow('Parameter slug is required');
})

test('geografis.getDistrictBySlug should throw error "Parameter slug must be string"', () => {
    expect(() => geografis.getDistrictBySlug(11)).toThrow('Parameter slug must be string');
})