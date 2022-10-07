const geografis = require('../src/main.js');

test('geografis.getDistrict should return object', () => {
    expect(typeof geografis.getDistrict('31.71.01')).toBe('object');
})

test('geografis.getDistrict should return district code 11.01.01', () => {
    const district = geografis.getDistrict('11.01.01');
    expect(district.code).toBe('11.01.01'); 
})

test('geografis.getDistrict should return 7 villages', () => {
    const district = geografis.getDistrict('11.01.01');
    expect(district.villages).toHaveLength(7); 
})

test('geografis.getDistrict should return empty object if district not found', () => {
    const district = geografis.getDistrict('11.01.099');
    expect(district).toEqual({}); 
})

test('geografis.getDistrict should return empty object if city not found', () => {
    const district = geografis.getDistrict('11.021.099');
    expect(district).toEqual({}); 
})

test('geografis.getDistrict should return empty object if province not found', () => {
    const district = geografis.getDistrict('123.01.099');
    expect(district).toEqual({});  
})

test('geografis.getDistrict should trow error "Parameter code is required"', () => { 
    expect(() => geografis.getDistrict()).toThrow('Parameter code is required'); 
})

test('geografis.getDistrict should trow error "Parameter code must be string"', () => {
    expect(() => geografis.getDistrict(123)).toThrow('Parameter code must be string');
})