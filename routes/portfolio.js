const router = require('express').Router();
const auth = require('../middleware/auth');
const { Hero, About, Skills, Project, Education } = require('../models/Portfolio');

// helper: get or create singleton doc
const getOrCreate = (Model) => async () => {
  let doc = await Model.findOne();
  if (!doc) doc = await new Model().save();
  return doc;
};

// ── HERO ──────────────────────────────
router.get('/hero', async (_, res) => {
  try { res.json(await getOrCreate(Hero)()); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/hero', auth, async (req, res) => {
  try {
    let doc = await Hero.findOne();
    if (!doc) doc = new Hero();
    Object.assign(doc, req.body);
    await doc.save();
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── ABOUT ─────────────────────────────
router.get('/about', async (_, res) => {
  try { res.json(await getOrCreate(About)()); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/about', auth, async (req, res) => {
  try {
    let doc = await About.findOne();
    if (!doc) doc = new About();
    Object.assign(doc, req.body);
    await doc.save();
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── SKILLS ────────────────────────────
router.get('/skills', async (_, res) => {
  try { res.json(await getOrCreate(Skills)()); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/skills', auth, async (req, res) => {
  try {
    let doc = await Skills.findOne();
    if (!doc) doc = new Skills();
    doc.categories = req.body.categories;
    await doc.save();
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── PROJECTS ──────────────────────────
router.get('/projects', async (_, res) => {
  try { res.json(await Project.find().sort({ order: 1, createdAt: -1 })); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.post('/projects', auth, async (req, res) => {
  try { res.status(201).json(await new Project(req.body).save()); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/projects/:id', auth, async (req, res) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.delete('/projects/:id', auth, async (req, res) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (e) { res.status(500).json({ message: e.message }); }
});

// ── EDUCATION ─────────────────────────
router.get('/education', async (_, res) => {
  try { res.json(await getOrCreate(Education)()); } catch (e) { res.status(500).json({ message: e.message }); }
});
router.put('/education', auth, async (req, res) => {
  try {
    let doc = await Education.findOne();
    if (!doc) doc = new Education();
    doc.items = req.body.items;
    await doc.save();
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
