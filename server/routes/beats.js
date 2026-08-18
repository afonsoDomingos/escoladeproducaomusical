const router = require('express').Router();
const Beat = require('../models/Beat');

// GET /api/beats - listar todos os beats
router.get('/', async (req, res) => {
  try {
    const { genre, featured } = req.query;
    const filter = {};
    if (genre && genre !== 'Todos') filter.genre = { $regex: genre, $options: 'i' };
    if (featured === 'true') filter.isFeatured = true;

    const beats = await Beat.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: beats, total: beats.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/beats - criar novo beat (admin)
router.post('/', async (req, res) => {
  try {
    const beat = new Beat(req.body);
    await beat.save();
    res.status(201).json({ success: true, data: beat });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/beats/:id - remover beat (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Beat.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Beat removido.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/beats/:id - actualizar beat
router.patch('/:id', async (req, res) => {
  try {
    const beat = await Beat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: beat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
