const utils = require('../src/utils.js');

test('utils.calculateDistance should return 0 if latitude and longitude is same', () => {
    const latLon = { latitude: -6.875218, longitude: 107.625931 }
    const distance = utils.calculateDistance(latLon, latLon);
    expect(distance).toBe(0);
})

test('utils.calculateDistance should return exactly 117m', () => {
    const latLon1 = { latitude: -6.875218, longitude: 107.625931 }
    const latLon2 = { latitude: -6.176262, longitude: 106.829324 }
    const distance = utils.calculateDistance(latLon1, latLon2);
    expect(distance).toBe(117.41034272934036);
})

test('utils.calculateDistance should throw error if latitude or longitude is empty', () => {
    expect(() => utils.calculateDistance()).toThrow('Parameter a and b is required');
})

test('utils.calculateDistance should throw error if latitude or longitude is not object', () => {
    expect(() => utils.calculateDistance('a', 'b')).toThrow('Parameter a and b must be object');
})

test('utils.calculateDistance should throw error if latitude or longitude is not have latitude and longitude', () => {
    expect(() => utils.calculateDistance({ a: 1 }, { b: 2 })).toThrow('Parameter a and b must have latitude and longitude');
})

test('utils.calculateDistance should throw error if latitude or longitude is not number', () => {
    expect(() => utils.calculateDistance({ latitude: 'a', longitude: 'b' }, { latitude: 'a', longitude: 'b' })).toThrow('Parameter a and b must have latitude and longitude as number');
})