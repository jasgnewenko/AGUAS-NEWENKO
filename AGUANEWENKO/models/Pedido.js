const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente: String,
  productos: [{ nombre: String, cantidad: Number }],
  total: Number,
  fecha: Date,
  estado: String // ejemplo: "pendiente", "completado"
});

module.exports = mongoose.model('Pedido', PedidoSchema);