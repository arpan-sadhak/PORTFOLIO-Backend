# ⚡ Arpan Sadhak — Full-Stack Portfolio

> **MERN Stack** · Admin-editable · Deploy on **Render + Vercel**

```
STACK: MongoDB · Express.js · React (Vite) · Node.js
AUTH:  JWT (admin-only editing)
DEPLOY: Backend → Render  |  Frontend → Vercel
```

---

## 📁 Project Structure

```
portfolio/
├── backend/               # Express + MongoDB API
│   ├── middleware/auth.js  # JWT guard
│   ├── models/
│   │   ├── User.js         # Admin user (bcrypt hashed)
│   │   └── Portfolio.js    # Hero, About, Skills, Project, Education, Message
│   ├── routes/
│   │   ├── auth.js         # POST /api/auth/login  GET /api/auth/me
│   │   ├── portfolio.js    # CRUD for all sections
│   │   └── contact.js      # Visitor messages
│   ├── server.js
│   ├── seed.js             # Creates admin + default data
│   └── .env.example
│
└── frontend/              # React + Vite
    └── src/
        ├── pages/
        │   ├── Portfolio.jsx   # Public-facing site
        │   ├── Login.jsx       # /admin/login
        │   └── Admin.jsx       # /admin  (protected)
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Hero.jsx        # Matrix rain + typewriter
        │   ├── About.jsx       # Orbital sphere animation
        │   ├── Skills.jsx      # Terminal-style skill pills
        │   ├── Projects.jsx    # Hover cards + links
        │   ├── Education.jsx   # Glowing timeline
        │   └── Contact.jsx     # Form → saves to DB
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ToastContext.jsx
        └── api.js              # Axios helpers
```

---

## 🚀 Local Development

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Install both at once
npm run install:all
```

### 2. Set up environment

```bash
cp backend/.env.example backend/.env
# Then edit backend/.env:
```

```env
PORT=5000
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/portfolio
JWT_SECRET=any_random_long_string
ADMIN_EMAIL=xyz@gmail.com
ADMIN_PASSWORD=123456789
CLIENT_URL=http://localhost:5173
```

### 3. Seed the database (first time only)

```bash
npm run seed
# ✅ Creates admin user + default portfolio data
```

### 4. Run both servers

```bash
# Terminal 1 — backend (port 5000)
npm run dev:backend

# Terminal 2 — frontend (port 5173)
npm run dev:frontend
```

- **Portfolio site:** http://localhost:5173
- **Admin panel:**   http://localhost:5173/admin/login
- **API health:**    http://localhost:5000/api/health

---

## 🌐 Deployment

### Backend → Render (free tier)

1. Push repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. Build: `npm install` · Start: `npm start`
5. Add **Environment Variables** in Render dashboard:
   ```
   MONGO_URI        = <your Atlas URI>
   JWT_SECRET       = <random string>
   ADMIN_EMAIL      = <your email>
   ADMIN_PASSWORD   = <your password>
   CLIENT_URL       = https://your-vercel-app.vercel.app
   ```
6. After first deploy, run seed via Render Shell: `node seed.js`
7. Copy your Render URL: `https://arpan-portfolio-api.onrender.com`

### Frontend → Vercel (free tier)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo, set **Root Directory** to `frontend`
3. Add **Environment Variable:**
   ```
   VITE_API_URL = https://arpan-portfolio-api.onrender.com
   ```
4. Deploy — Vercel auto-runs `npm run build`
5. Go back to Render and update `CLIENT_URL` to your Vercel URL

---

## 🔒 Admin Panel

| URL | Description |
|-----|-------------|
| `/admin/login` | Login with your admin credentials |
| `/admin` | Full CMS dashboard |

### What you can edit from Admin:

| Section | What you can change |
|---------|-------------------|
| **Hero** | Name, tagline, typewriter roles, resume URL, availability status |
| **About** | Bio paragraphs, stat boxes (value + label) |
| **Skills** | Add/remove categories and individual skills |
| **Projects** | Full CRUD — title, description, tags, GitHub URL, live URL, featured flag, sort order |
| **Education** | Add/remove/edit timeline entries |
| **Messages** | View contact form submissions, mark read, delete |

---

## 📮 API Endpoints

```
GET    /api/health               → server status

POST   /api/auth/login           → { email, password } → { token, user }
GET    /api/auth/me              → 🔒 current admin

GET    /api/portfolio/hero       → public
PUT    /api/portfolio/hero       → 🔒 admin
GET    /api/portfolio/about      → public
PUT    /api/portfolio/about      → 🔒 admin
GET    /api/portfolio/skills     → public
PUT    /api/portfolio/skills     → 🔒 admin
GET    /api/portfolio/projects   → public
POST   /api/portfolio/projects   → 🔒 admin
PUT    /api/portfolio/projects/:id → 🔒 admin
DELETE /api/portfolio/projects/:id → 🔒 admin
GET    /api/portfolio/education  → public
PUT    /api/portfolio/education  → 🔒 admin

POST   /api/contact              → public (visitor message)
GET    /api/contact              → 🔒 admin
PATCH  /api/contact/:id/read     → 🔒 admin
DELETE /api/contact/:id          → 🔒 admin
```

---

## ➕ Adding a New Project (Admin UI)

1. Go to `/admin/login` → log in
2. Click **PROJECTS** tab
3. Click **+ ADD NEW PROJECT**
4. Fill: Title, Description, Tags (comma-separated), GitHub URL, Live URL
5. Toggle **FEATURED** to pin it with a ★
6. Set **ORDER** number (lower = appears first)
7. Click **SAVE**

That's it — it's live on the public site instantly.

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router 6, Vite, Axios |
| Backend | Node.js, Express 4, JWT, Bcrypt |
| Database | MongoDB Atlas (Mongoose) |
| Styling | Pure CSS (no framework — cyberpunk custom theme) |
| Deploy | Render (API) + Vercel (Frontend) |

---

*Built by Arpan Sadhak · #Developing the Development*
