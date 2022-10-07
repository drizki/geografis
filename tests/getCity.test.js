const geografis = require('../src/main.js');

test('geografis.getProvince should be object', () => {
    const province = geografis.getProvince('11');
    expect(typeof province).toBe('object');
})

test('geografis.getCity should return city code 11.01', () => {
    const citiy = geografis.getCity('11.01');
    expect(citiy.code).toBe('11.01'); 
}) 

test('geografis.getCity should have 18 districts', () => {
    const city = geografis.getCity('11.01');
    expect(city.districts).toHaveLength(18); 
})

test('geografis.getCity should return empty object if province is not found', () => {
    const city = geografis.getCity('99.01');
    expect(city).toEqual({});
})

test('geografis.getCity should return empty object if city is not found', () => {
    const city = geografis.getCity('99.01');
    expect(city).toEqual({});
})

test('geografis.getCity should throw error "Parameter code is required"', () => {
    expect(() => geografis.getCity()).toThrow('Parameter code is required'); 
})

test('geografis.getCity should throw error "Parameter code must be string"', () => {
    expect(() => geografis.getCity(11)).toThrow('Parameter code must be string'); 
})