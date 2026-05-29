const router = require('express').Router();
const auth = require('../middleware/auth');
const { Message } = require('../models/Portfolio');

// POST /api/contact  (public — visitor sends message)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });
    const msg = await new Message({ name, email, message }).save();
    res.status(201).json({ success: true, id: msg._id });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET /api/contact  (admin — view all messages)
router.get('/', auth, async (_, res) => {
  try { res.json(await Message.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ message: e.message }); }
});

// PATCH /api/contact/:id/read  (admin — mark read)
router.patch('/:id/read', auth, async (req, res) => {
  try { res.json(await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })); } catch (e) { res.status(500).json({ message: e.message }); }
});

// DELETE /api/contact/:id  (admin — delete)
router.delete('/:id', auth, async (req, res) => {
  try { await Message.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
