const express = require('express');
const router = express.Router();
const axios = require('axios');
const Pedido = require('../models/Pedido');
const Inventario = require('../models/Inventario');
const Finanzas = require('../models/Finanzas');

router.post('/', async (req, res) => {
  const { prompt, tipo } = req.body;
  if (!prompt || !tipo) return res.status(400).json({ error: 'Prompt y tipo requeridos' });

  // Carga los datos relevantes según el tipo de análisis
  let datos = [];
  if (tipo === 'finanzas') {
    datos = await Finanzas.find({}).sort({ fecha: -1 }).limit(50);
  } else if (tipo === 'pedidos') {
    datos = await Pedido.find({}).sort({ fecha: -1 }).limit(50);
  } else if (tipo === 'inventario') {
    datos = await Inventario.find({});
  }

  const contexto = `
Datos de ${tipo}:
${JSON.stringify(datos, null, 2)}

Pregunta del administrador: ${prompt}
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres un asistente experto en análisis empresarial. Analiza los datos entregados y responde de forma precisa y profesional, ayudando al administrador a tomar decisiones." },
          { role: "user", content: contexto }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

module.exports = router;