const router = require('express').Router();
const LiveClass = require('../models/LiveClass');

router.get('/', async (req, res) => {
  try {
    const classes = await LiveClass.find().sort({ createdAt: -1 });
    res.json({ success: true, data: classes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cls = new LiveClass(req.body);
    await cls.save();
    res.status(201).json({ success: true, data: cls });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const cls = await LiveClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: cls });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await LiveClass.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Aula ao vivo cancelada.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
