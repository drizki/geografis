const geografis = require('../src/main.js');

test('geografis.search should results one item count', () => {
    const search = geografis.search('ciumbuleuit');
    expect(search.count).toBe(1);
})