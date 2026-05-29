const mongoose = require('mongoose');

// ── Hero ─────────────────────────────
const heroSchema = new mongoose.Schema({
  name: { type: String, default: 'Arpan Sadhak' },
  tagline: { type: String, default: 'B.Tech CSE · Swami Vivekananda University' },
  roles: { type: [String], default: ['Full-Stack Developer 🚀', 'MERN Stack Engineer ⚡', 'Python & AI Enthusiast 🤖', '#Developing the Development'] },
  resumeUrl: { type: String, default: '' },
  available: { type: Boolean, default: true },
});

// ── About ─────────────────────────────
const aboutSchema = new mongoose.Schema({
  bio: { type: [String], default: ['Hey, I\'m Arpan Sadhak — a 2nd year B.Tech CSE student at Swami Vivekananda University.', 'I build full-stack systems and dive deep into Python & AI. My mantra: "Jibon Cholche Na Ar Soja Pothe"'] },
  stats: {
    type: [{ label: String, value: String }],
    default: [
      { label: 'TECH STACKS', value: '10+' },
      { label: 'YEAR B.TECH', value: '2nd' },
      { label: 'CURIOSITY', value: '∞' },
      { label: 'MISSION', value: '01' },
    ],
  },
  profileImage: { type: String, default: '' },
});

// ── Skills ────────────────────────────
const skillsSchema = new mongoose.Schema({
  categories: {
    type: [{ name: String, skills: [String] }],
    default: [
      { name: 'PROGRAMMING LANGUAGES', skills: ['Python', 'JavaScript', 'Java', 'C', 'C++', 'PHP'] },
      { name: 'FRONTEND', skills: ['React', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'] },
      { name: 'BACKEND & FRAMEWORKS', skills: ['Node.js', 'Express.js', 'Django', 'FastAPI', 'Flask'] },
      { name: 'DATABASES', skills: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'] },
      { name: 'DEVOPS & TOOLS', skills: ['Docker', 'Git', 'GitHub', 'Postman', 'Vercel', 'Render'] },
    ],
  },
});

// ── Projects ──────────────────────────
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Education ─────────────────────────
const educationSchema = new mongoose.Schema({
  items: {
    type: [{
      period: String,
      title: String,
      subtitle: String,
      order: Number,
    }],
    default: [
      { period: '2026 — PRESENT', title: 'B.TECH — COMPUTER SCIENCE & ENGINEERING', subtitle: 'Swami Vivekananda University, West Bengal · Currently in 2nd Year', order: 1 },
      { period: '2022 — 2023', title: 'HIGHER SECONDARY (CLASS XII)', subtitle: 'Science Stream · Physics, Chemistry, Mathematics, Computer Science', order: 2 },
    ],
  },
});

// ── Contact Message ───────────────────
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = {
  Hero: mongoose.model('Hero', heroSchema),
  About: mongoose.model('About', aboutSchema),
  Skills: mongoose.model('Skills', skillsSchema),
  Project: mongoose.model('Project', projectSchema),
  Education: mongoose.model('Education', educationSchema),
  Message: mongoose.model('Message', messageSchema),
};
