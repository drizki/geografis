const geografis = require('../src/main.js');

test('geografis.getProvince should be object', () => {
    const province = geografis.getProvince('11');
    expect(typeof province).toBe('object'); 
})

test('geografis.getProvince should return province correct province code', () => {
    const cities = geografis.getProvince('11');
    expect(cities.code).toBe('11'); 
})

test('geografis.getProvince should results correct cities count', () => {
    const province = geografis.getProvince('11');
    expect(province.cities).toHaveLength(23); 
})
 
test('geografis.getProvince should return empty if code is not found', () => {
    const province = geografis.getProvince('99');
    expect(province).toEqual({});
})

test('geografis.getProvince should throw error "Parameter code is required"', () => {
    expect(() => geografis.getProvince()).toThrow('Parameter code is required'); 
})

test('geografis.getProvince should throw error "Parameter code must be string"', () => {
    expect(() => geografis.getProvince(11)).toThrow('Parameter code must be string'); 
})