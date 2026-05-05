const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/data/inventory.json');

beforeEach(() => {
    fs.writeFileSync(filePath, JSON.stringify([]));
});

const {
    addItem,
    getItems,
    reduceStock,
    deleteItem
} = require('../../src/services/inventoryService');

describe('Inventory Service', () => {

    test('add item', () => {
        const item = addItem({ name: 'Laptop', stock: 10 });
        expect(item.name).toBe('Laptop');
    });

    test('get items', () => {
        addItem({ name: 'Mouse', stock: 5 });
        const items = getItems();
        expect(items.length).toBe(1);
    });

    test('reduce stock berhasil', () => {
        const item = addItem({ name: 'Keyboard', stock: 5 });
        const updated = reduceStock(item.id, 2);
        expect(updated.stock).toBe(3);
    });

    test('reduce stock gagal', () => {
        const item = addItem({ name: 'Keyboard', stock: 1 });

        expect(() => {
            reduceStock(item.id, 5);
        }).toThrow();
    });

    test('delete item', () => {
        const item = addItem({ name: 'Monitor', stock: 3 });
        deleteItem(item.id);

        const items = getItems();
        expect(items.length).toBe(0);
    });

});