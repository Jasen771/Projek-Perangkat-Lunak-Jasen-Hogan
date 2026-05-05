const express = require('express');
const router = express.Router();

const {
    addItem,
    getItems,
    reduceStock,
    deleteItem
} = require('../services/inventoryService');

const { validateItem } = require('../utils/validator');

router.get('/inventory', (req, res) => {
    res.json(getItems());
});

router.post('/inventory', (req, res) => {
    if (!validateItem(req.body)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const item = addItem(req.body);
    res.status(201).json(item);
});

router.delete('/inventory/:id', (req, res) => {
    deleteItem(parseInt(req.params.id));
    res.status(200).json({ message: 'Deleted' });
});

module.exports = router;