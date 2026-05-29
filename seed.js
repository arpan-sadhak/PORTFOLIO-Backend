require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const { Hero, About, Skills, Project, Education } = require('./models/Portfolio');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB...');

  // Admin user
  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existing) {
    await new User({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }).save();
    console.log('✅ Admin user created:', process.env.ADMIN_EMAIL);
  } else {
    console.log('ℹ️  Admin already exists');
  }

  // Default portfolio data (only if empty)
  if (!(await Hero.findOne())) { await new Hero().save(); console.log('✅ Hero seeded'); }
  if (!(await About.findOne())) { await new About().save(); console.log('✅ About seeded'); }
  if (!(await Skills.findOne())) { await new Skills().save(); console.log('✅ Skills seeded'); }
  if (!(await Education.findOne())) { await new Education().save(); console.log('✅ Education seeded'); }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      { title: 'Smart Attendance System', description: 'Face recognition based automated attendance tracker using OpenCV and Python.', tags: ['Python', 'OpenCV', 'MySQL', 'Tkinter'], githubUrl: 'https://github.com/arpan-sadhak', order: 1 },
      { title: 'Full-Stack E-Commerce', description: 'MERN stack e-commerce platform with auth, product management, cart, and admin dashboard.', tags: ['MongoDB', 'Express.js', 'React', 'Node.js'], githubUrl: 'https://github.com/arpan-sadhak', liveUrl: '', featured: true, order: 2 },
    ]);
    console.log('✅ Projects seeded');
  }

  console.log('\n🎉 Seed complete! Login with:', process.env.ADMIN_EMAIL, '/', process.env.ADMIN_PASSWORD);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
