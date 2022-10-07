const geografis = require('../src/main.js');

test('geografis.getVillageByPostalCode should return array of object', () => {
    const search = geografis.getVillageByPostalCode(40161);
    expect(Array.isArray(search)).toBe(true);
})

test('geografis.getVillageByPostalCode should return village code 32.73.08.1002', () => {
    const search = geografis.getVillageByPostalCode(40142);
    expect(search[0].code).toBe('32.73.08.1002'); 
})

test('geografis.getVillageByPostalCode should return village name Ciumbuleuit', () => {
    const search = geografis.getVillageByPostalCode(40142);
    expect(search[0].village).toBe('Ciumbuleuit'); 
}) 

test('geografis.getVillageByPostalCode should return empty array', () => {
    const search = geografis.getVillageByPostalCode(123);
    expect(search).toEqual([]);
})

test('geografis.getVillageByPostalCode should throw error "Parameter code is required"', () => {
    expect(() => geografis.getVillageByPostalCode()).toThrow('Parameter postalCode is required'); 
} )

test('geografis.getVillageByPostalCode should throw error "Parameter postalCode must be number"', () => {
    expect(() => geografis.getVillageByPostalCode({})).toThrow('Parameter postalCode must be number'); 
})