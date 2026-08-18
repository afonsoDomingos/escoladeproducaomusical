const router = require('express').Router();
const Plugin = require('../models/Plugin');

router.get('/', async (req, res) => {
  try {
    const plugins = await Plugin.find().sort({ createdAt: -1 });
    res.json({ success: true, data: plugins });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const plugin = new Plugin(req.body);
    await plugin.save();
    res.status(201).json({ success: true, data: plugin });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Plugin.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Plugin removido.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
