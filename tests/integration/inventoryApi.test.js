const request = require('supertest');
const app = require('../../src/app');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/data/inventory.json');

beforeEach(() => {
    fs.writeFileSync(filePath, JSON.stringify([]));
});

describe('Inventory API', () => {

    test('POST gagal (nama kosong)', async () => {
        const res = await request(app)
            .post('/inventory')
            .send({ name: '', stock: 5 });

        expect(res.statusCode).toBe(400);
    });

    test('POST gagal (stock negatif)', async () => {
        const res = await request(app)
            .post('/inventory')
            .send({ name: 'Laptop', stock: -1 });

        expect(res.statusCode).toBe(400);
    });

    test('DELETE berhasil', async () => {
        const create = await request(app)
            .post('/inventory')
            .send({ name: 'Monitor', stock: 3 });

        const id = create.body.id;

        const res = await request(app).delete(`/inventory/${id}`);

        expect(res.statusCode).toBe(200);
    });

});