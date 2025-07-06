const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simulación de envío de OTP (en producción, usar Twilio o similar)
function sendFakeSMS(phone, otp) {
  console.log(`Envio OTP ${otp} al teléfono ${phone}`);
  // Aquí deberías llamar a tu servicio SMS real
}

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Teléfono requerido' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60000);

  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone, otp, otpExpires });
  } else {
    user.otp = otp;
    user.otpExpires = otpExpires;
  }
  await user.save();

  sendFakeSMS(phone, otp);

  res.json({ message: 'OTP enviado' });
});

router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'Datos requeridos' });

  const user = await User.findOne({ phone });
  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(401).json({ error: 'OTP inválido o expirado' });
  }
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign({ id: user._id, phone: user.phone, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' });

  res.json({ token, phone: user.phone, role: user.role, modules: user.modules });
});

module.exports = router;