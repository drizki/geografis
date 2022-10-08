const geografis = require('../src/main.js');

const myLatitude = -6.875218;
const myLongitude = 107.625931;

test('geografis.getNearest should return correct nearest village name', () => {
    const nearest = geografis.getNearest(myLatitude, myLongitude);
    expect(nearest.village).toBe('Cigadung'); 
})

test('geografis.getNearest should return correct nearest village code', () => {
    const nearest = geografis.getNearest(myLatitude, myLongitude);
    expect(nearest.code).toBe('32.73.18.1004'); 
})

test('geografis.getNearest should throw error if latitude or longitude is empty', () => {
    expect(() => geografis.getNearest()).toThrow('Parameter latitude and longitude is required');
})

test('geografis.getNearest should throw error if latitude or longitude is not number', () => {
    expect(() => geografis.getNearest('a', 'b')).toThrow('Parameter latitude and longitude must be number');
})
