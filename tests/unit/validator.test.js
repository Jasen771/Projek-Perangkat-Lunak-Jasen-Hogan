const { validateItem } = require('../../src/utils/validator');

describe('Validator', () => {

    test('valid data', () => {
        const result = validateItem({ name: 'Laptop', stock: 5 });
        expect(result).toBe(true);
    });

    test('nama kosong', () => {
        const result = validateItem({ name: '', stock: 5 });
        expect(result).toBe(false);
    });

    test('stock negatif', () => {
        const result = validateItem({ name: 'Laptop', stock: -1 });
        expect(result).toBe(false);
    });

    test('stock bukan angka', () => {
        const result = validateItem({ name: 'Laptop', stock: 'abc' });
        expect(result).toBe(false);
    });

});