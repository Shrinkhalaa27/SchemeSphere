# SchemeSphere – Complete VS Code Setup Guide

## Project Structure

```
schemesphere/
├── backend/
│   ├── data/
│   │   └── schemes.js          ← All 20 scheme records
│   ├── routes/
│   │   ├── schemes.js          ← GET /api/schemes, /suggestions, /trending
│   │   ├── chat.js             ← POST /api/chat (AI chatbot)
│   │   ├── feedback.js         ← POST /api/feedback
│   │   └── stats.js            ← GET /api/stats
│   ├── .env                    ← Environment variables (PORT, MONGODB_URI, ANTHROPIC_API_KEY)
│   ├── package.json
│   └── server.js               ← Express entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Hero.js             ← Search bar + suggestions
    │   │   ├── Filters.js          ← Smart filters panel
    │   │   ├── SchemeCard.js       ← Card + detail modal
    │   │   ├── StatsSection.js     ← Animated counters
    │   │   ├── PrivacySection.js   ← Privacy policy tabs
    │   │   ├── FeedbackSection.js  ← Contact form
    │   │   ├── Chatbot.js          ← AI chatbot widget
    │   │   └── Footer.js
    │   ├── hooks/
    │   │   └── useCountUp.js
    │   ├── utils/
    │   │   └── api.js              ← All API calls (axios)
    │   ├── App.js                  ← Main layout + state
    │   ├── index.js
    │   ├── index.css
    │   └── package.json
    └── package.json
```

---

## Step-by-Step Setup in VS Code

### Prerequisites
Install these first (check with the commands shown):

| Tool | Check Command | Download |
|------|--------------|---------|
| Node.js (v18+) | `node -v` | nodejs.org |
| npm | `npm -v` | comes with Node |
| Git | `git --version` | git-scm.com |

---

### Step 1 — Open the Project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `schemesphere` folder
4. You should see `backend/` and `frontend/` in the Explorer

---

### Step 2 — Setup the Backend

Open the **integrated terminal** in VS Code (`Ctrl + `` ` ``):

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install
```

This installs: express, cors, helmet, dotenv, express-rate-limit, nodemailer, uuid, nodemon

**Edit the `.env` file:**

Open `backend/.env` and update:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/schemesphere
ANTHROPIC_API_KEY=your_real_key_here   ← Get from console.anthropic.com
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

> **Note:** The chatbot works WITHOUT an Anthropic API key using built-in fallback responses. For full AI responses, get a free key at console.anthropic.com

---

### Step 3 — Setup the Frontend

Open a **new terminal tab** in VS Code (`Ctrl + Shift + `` ` ``):

```bash
# Navigate to frontend folder
cd frontend

# Install all dependencies
npm install
```

This installs: react, react-dom, react-scripts, axios

---

### Step 4 — Run Both Servers

**Terminal 1 — Backend (port 5000):**
```bash
cd backend
npm run dev
```
You should see: `🚀 SchemeSphere API running on http://localhost:5000`

**Terminal 2 — Frontend (port 3000):**
```bash
cd frontend
npm start
```
Browser will auto-open at: `http://localhost:3000`

---

### Step 5 — Verify Everything Works

Open your browser and test:

| URL | Expected Result |
|-----|----------------|
| `http://localhost:3000` | Full SchemeSphere website |
| `http://localhost:5000/api/health` | `{"status":"ok"}` |
| `http://localhost:5000/api/schemes` | JSON list of 20 schemes |
| `http://localhost:5000/api/schemes/trending` | 5 trending schemes |
| `http://localhost:5000/api/stats` | Platform statistics |

---

## VS Code Recommended Extensions

Install these for the best experience:

- **ES7+ React/Redux/React-Native snippets** — React shortcuts
- **Prettier - Code formatter** — Auto format code
- **ESLint** — Catch JavaScript errors
- **REST Client** — Test API endpoints directly in VS Code
- **GitLens** — Git history

---

## API Endpoints Reference

### Schemes
```
GET  /api/schemes                    → All schemes
GET  /api/schemes?q=farmer           → Search schemes
GET  /api/schemes?category=Health    → Filter by category
GET  /api/schemes?targetGroup=Girls  → Filter by target group
GET  /api/schemes?schemeType=Central Govt → Filter by type
GET  /api/schemes?sort=latest        → Sort by year
GET  /api/schemes/trending           → Top 5 trending
GET  /api/schemes/suggestions?q=far  → Search suggestions
GET  /api/schemes/:id                → Single scheme detail
```

### Chat (AI Chatbot)
```
POST /api/chat
Body: { "messages": [{ "role": "user", "content": "farmer schemes" }] }
```

### Feedback
```
POST /api/feedback
Body: { "name": "...", "email": "...", "message": "...", "type": "general" }
```

### Stats
```
GET  /api/stats                      → Platform statistics
```

---

## Common Issues & Fixes

| Problem | Solution |
|---------|---------|
| `npm install` fails | Run `npm install --legacy-peer-deps` |
| Port 3000 already in use | Run `npx kill-port 3000` then retry |
| Port 5000 already in use | Run `npx kill-port 5000` then retry |
| "Cannot find module" error | Delete `node_modules` folder and re-run `npm install` |
| CORS error in browser | Make sure backend is running on port 5000 |
| Chatbot says "connecting..." | Normal if no API key — fallback responses still work |
| Schemes not loading | Check backend terminal for errors, verify port 5000 |

---

## How the Frontend Connects to Backend

The `frontend/package.json` has:
```json
"proxy": "http://localhost:5000"
```

This means all `/api/...` calls from React automatically go to the backend. The `src/utils/api.js` file handles all API calls using axios.

---

## Contact

- **Primary:** 2330403@kiit.ac.in  
- **Secondary:** 2330417@kiit.ac.in  
- **Institution:** KIIT University, Bhubaneswar, Odisha

---

*SchemeSphere — Empowering every Indian citizen with knowledge of their entitlements* 🇮🇳
