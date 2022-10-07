const geografis = require('../src/main.js');

test('geografis.getProvinces should output all provinces', () => {
    const provinces = geografis.getProvinces();
    expect(provinces).toHaveLength(34); 
})

test('geografis.getProvinces first element should have code 11', () => {
    const provinces = geografis.getProvinces(); 
    expect(provinces[0].code).toBe("11"); 
})

test('geografis.getProvinces last element should have code 92', () => {
    const provinces = geografis.getProvinces(); 
    expect(provinces[33].code).toBe("92"); 
})

