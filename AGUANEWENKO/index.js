require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const gptRoutes = require('./routes/gpt');
const gptAnalisisRoutes = require('./routes/gpt-analisis');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/gpt/analisis', gptAnalisisRoutes);

app.get('/', (req, res) => res.send('API AGUAS NEWENKO OK'));

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err.message);
  });