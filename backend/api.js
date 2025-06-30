const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/ventas', (req, res) => {
  res.json({ semana: 150000, mes: 620000, anual: 4800000 });
});

app.get('/api/finanzas', (req, res) => {
  res.json({ ingresos: 750000, egresos: 320000, balance: 430000 });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
