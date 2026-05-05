const express = require('express');
const app = express();

const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(express.json());
app.use(inventoryRoutes);

module.exports = app;
app.get('/', (req, res) => {
  res.send('API Inventory jalan');
});