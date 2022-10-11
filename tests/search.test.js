const geografis = require('../src/main.js');

test('geografis.search should return object', () => {
    expect(geografis.search('ciumbuleuit', 10, 1)).toBeInstanceOf(Object);
})

test('geografis.search should return correct object keys of count, limit, offset, and data', () => {
    expect(Object.keys(geografis.search('ciumbuleuit', 10, 1))).toEqual(['count', 'limit', 'offset', 'data']);
})

test('geografis.search should return exactly 1 result data', () => {
    expect(geografis.search('40142').count).toBe(1);
})

test('geografis.search should throw "Parameter query is required"', () => { 
    expect(() => geografis.search()).toThrow('Parameter query is required');
})

test('geografis.search should throw "Parameter query must be string"', () => {
    expect(() => geografis.search(123)).toThrow('Parameter query must be string');
})

test('geografis.search should throw "Parameter limit must be number"', () => {
    expect(() => geografis.search('ciumbuleuit', '10')).toThrow('Parameter limit must be number');
})

test('geografis.search should throw "Parameter offset must be number"', () => {
    expect(() => geografis.search('ciumbuleuit', 10, '1')).toThrow('Parameter offset must be number');
})

test('geografis.search should throw "Parameter limit must be greater than 0"', () => {
    expect(() => geografis.search('ciumbuleuit', 0, 1)).toThrow('Parameter limit must be greater than 0');
})

test('geografis.search should throw "Parameter offset can not be negative number"', () => {
    expect(() => geografis.search('ciumbuleuit', 10, -1)).toThrow('Parameter offset can not be negative number');
})



