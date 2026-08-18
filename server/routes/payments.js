const router = require('express').Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

// GET /api/payments
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'Todos' ? { status } : {};
    const payments = await Payment.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/payments - submeter pagamento
router.post('/', async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, status: 'Pendente' });
    await payment.save();
    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH /api/payments/:id/approve
router.patch('/:id/approve', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: 'Aprovado', processedAt: new Date() },
      { new: true }
    );
    // Activate student enrollment
    if (payment?.userId) {
      await User.findByIdAndUpdate(payment.userId, { enrollmentStatus: 'approved' });
    }
    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/payments/:id/reject
router.patch('/:id/reject', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejeitado', notes: req.body.reason || 'Comprovativo inválido', processedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
