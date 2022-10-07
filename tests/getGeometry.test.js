const geografis = require('../src/main.js');

test('geometry.getGeometry should return object', () => {
    const geometry = geografis.getGeometry('32.73.08.1002', './data/geojson');
    expect(typeof geometry).toBe('object');
})

test('geometry.getGeometry should return object with complete properties', () => {
    const geometry = geografis.getGeometry('32.73.08.1002', './data/geojson');
    expect(Object.keys(geometry.properties)).toEqual([
        'code', 
        'postal',
        'slug',
        'province', 
        'city', 
        'district', 
        'village', 
        'latitude', 
        'longitude', 
        'elevation', 
        'geometry'
    ]);
})

test('geometry.getGeometry should throw error if code is empty', () => {
    expect(() => geografis.getGeometry()).toThrow('Parameter code is required');
})

test('geometry.getGeometry should throw error if geoJsonDir is empty', () => {
    expect(() => geografis.getGeometry('32.73.08.1002')).toThrow('Parameter geoJsonDir is required');
})

test('geometry.getGeometry should throw error if code is not string', () => {
    expect(() => geografis.getGeometry(1, './data/geojson')).toThrow('Parameter code must be string');
})

test('geometry.getGeometry should return empty if geojson could not be found', () => {
    const geometry = geografis.getGeometry('32.73.08.1002.1', './data/geojson');
    expect(geometry).toEqual({});
})