const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  producto: String,
  cantidad: Number,
  minimo: Number // stock mínimo recomendado
});

module.exports = mongoose.model('Inventario', InventarioSchema);