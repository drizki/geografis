const geografis = require('../src/main.js');

test('geografis.getVillage should return object', () => {
    expect(typeof geografis.getVillage('31.71.01.1001')).toBe('object');
})

test('geografis.getVillage should return village code 32.73.08.1002', () => {
    const village = geografis.getVillage('32.73.08.1002');
    expect(village.code).toBe('32.73.08.1002'); 
})

test('geografis.getVillage should return village name Ciumbuleuit', () => {
    const village = geografis.getVillage('32.73.08.1002');
    expect(village.village).toBe('Ciumbuleuit'); 
})

test('geografis.getVillage should return district name Cisarua', () => {
    const village = geografis.getVillage('32.73.08.1002');
    expect(village.district).toBe('Cidadap'); 
})

test('geografis.getVillage should return city name Bandung', () => {
    const village = geografis.getVillage('32.73.08.1002');
    expect(village.city).toBe('Kota Bandung'); 
})

test('geografis.getVillage should return province name Jawa Barat', () => {
    const village = geografis.getVillage('32.73.08.1002');
    expect(village.province).toBe('Jawa Barat'); 
})

test('geografis.getVillage should return empty object if village not found', () => {
    const village = geografis.getVillage('32.73.08.10023');
    expect(village).toEqual({});
})

test('geografis.getVillage should throw error "Parameter code is required"', () => {
    expect(() => geografis.getVillage()).toThrow('Parameter code is required'); 
} )

test('geografis.getVillage should throw error "Parameter code must be string"', () => {
    expect(() => geografis.getVillage({})).toThrow('Parameter code must be string'); 
})