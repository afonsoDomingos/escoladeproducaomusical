const router = require('express').Router();
const Certificate = require('../models/Certificate');

router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/verify/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const cert = await Certificate.findOne({
      $or: [
        { verificationCode: code },
        { certificateNumber: code }
      ]
    });
    if (!cert) return res.status(404).json({ success: false, error: 'Certificado não encontrado.' });
    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const cert = new Certificate({
      certificateNumber: `EPM-2026-${randomSuffix}`,
      verificationCode: `EPM-${randomSuffix}-VERIF`,
      ...req.body
    });
    await cert.save();
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
