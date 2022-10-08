const geografis = require('../src/main.js');

test('geografis.getProvinceBySlug should return object', () => {
    const province = geografis.getProvinceBySlug('jawa');
    expect(typeof province).toBe('object');
})

test('geografis.getProvinceBySlug should return correct province', () => {
    const province = geografis.getProvinceBySlug('jawa-barat');
    expect(province.province).toBe('Jawa Barat');
})

test('geografis.getProvinceBySlug should return empty object if slug is not found', () => {
    const province = geografis.getProvinceBySlug('jawa');
    expect(province).toEqual({});
})

test('geografis.getProvinceBySlug should throw error "Parameter slug is required"', () => {
    expect(() => geografis.getProvinceBySlug()).toThrow('Parameter slug is required');
})

test('geografis.getProvinceBySlug should throw error "Parameter slug must be string"', () => {
    expect(() => geografis.getProvinceBySlug(11)).toThrow('Parameter slug must be string');
})