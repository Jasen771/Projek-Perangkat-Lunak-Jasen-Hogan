const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/inventory.json');

function getItems() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function saveItems(items) {
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
}

function addItem(item) {
    const items = getItems();

    const newItem = {
        id: Date.now(),
        name: item.name,
        stock: item.stock
    };

    items.push(newItem);
    saveItems(items);

    return newItem;
}

function reduceStock(id, amount) {
    const items = getItems();

    const item = items.find(i => i.id == id);

    if (!item) {
        throw new Error('Barang tidak ditemukan');
    }

    if (item.stock < amount) {
        throw new Error('Stock tidak cukup');
    }

    item.stock -= amount;

    saveItems(items);

    return item;
}

function deleteItem(id) {
    let items = getItems();

    const filtered = items.filter(i => i.id != id);

    saveItems(filtered);

    return true;
}

module.exports = {
    getItems,
    addItem,
    reduceStock,
    deleteItem
};