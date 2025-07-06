const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware de autenticación simple
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token requerido' });
  const token = header.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Solo admin puede listar y editar usuarios
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Solo admin' });
  next();
}

// Obtener todos los usuarios
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  const users = await User.find({}, { otp: 0, otpExpires: 0 });
  res.json(users);
});

// Cambiar módulos de usuario
router.post('/modulos', authMiddleware, adminOnly, async (req, res) => {
  const { userId, modules } = req.body;
  if (!userId || !Array.isArray(modules)) return res.status(400).json({ error: 'Datos requeridos' });
  await User.findByIdAndUpdate(userId, { modules });
  res.json({ message: 'Módulos actualizados' });
});

module.exports = router;