const geografis = require('../src/main.js');

test('geografis.dump results should be array of 83449 villages', () => {
    const dump = geografis.dump();  
    expect(dump).toHaveLength(83449); 
})