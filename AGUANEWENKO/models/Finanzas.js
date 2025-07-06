const mongoose = require('mongoose');

const FinanzasSchema = new mongoose.Schema({
  tipo: String, // "ingreso" o "egreso"
  descripcion: String,
  monto: Number,
  fecha: Date
});

module.exports = mongoose.model('Finanzas', FinanzasSchema);