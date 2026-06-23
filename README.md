<div align="center">

# ⚡ TrendingPrompt

### Discover, Generate & Share AI Prompts That Actually Work

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Gemini API](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)

</div>

---

## ✨ Overview

**TrendingPrompt** is a premium, Gen-Z coded AI prompt discovery and generation platform. Stop guessing AI inputs — find, generate, and share high-signal prompts for ChatGPT, Gemini, Midjourney, Claude, and more.

- 🌌 **Dark-mode-first** UI with a drifting aurora gradient mesh background
- 🪟 **Glassmorphism** cards with neon glow hover effects
- ⚡ **Gemini API** powered prompt generation with intelligent fallback
- 🎯 **32 curated prompts** across 8 categories out of the box
- 📱 **Fully responsive** — mobile-first with a slide-in glass drawer nav

---

## 🖥️ Pages

| Page | Description |
|------|-------------|
| **Home** | Hero with CTA, live dual-direction marquee ticker, How It Works, featured prompts grid, category browser |
| **Explore** | Sticky search + sort controls + category chips, load-more with skeleton placeholders, empty state |
| **Generate** | Two-pane workspace — config (topic, model, tone, category) + live output with shimmer loading border |
| **Trending** | Time-period leaderboard, Recharts radar chart of category momentum, animated velocity bars |
| **Profile** | Editable bio & social links, My Prompts / Saved / Liked tabs, add/inline-edit/delete prompts |
| **404** | Custom animated not-found page matching the aurora aesthetic |

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | v3 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| Recharts | latest | Trending category radar chart |
| Lucide React | latest | Icon system |
| React Router | v7 | Client-side routing |

### Backend (`/backend`)
| Tool | Version | Purpose |
|------|---------|---------|
| Express | 5 | REST API server |
| Axios | latest | Gemini API HTTP client |
| dotenv | latest | Environment variable loading |
| cors | latest | Cross-origin request handling |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ 
- A **Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/TrendingPrompt.git
cd TrendingPrompt
```

### 2. Install all dependencies
```bash
# Install root + frontend + backend dependencies
npm run install:all
```

Or manually:
```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

### 3. Configure environment variables
```bash
cp backend/.env.example backend/.env
```
Then edit `backend/.env` and add your Gemini API key:
```env
PORT=5000
GEMINI_API_KEY=your_actual_key_here
CLIENT_ORIGIN=http://localhost:5173
```

### 4. Run the full stack
```bash
npm run dev
```
This starts both servers concurrently:
- 🌐 **Frontend** → http://localhost:5173
- ⚙️ **Backend API** → http://localhost:5000

> **No Gemini API key?** The generator gracefully falls back to a locally-structured prompt draft — all other pages work without it.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check + API key status |
| `GET` | `/api/prompts` | Get all prompts (filter by `?category=`, sort by `?sort=`) |
| `POST` | `/api/prompts/generate` | Generate a prompt via Gemini API |
| `POST` | `/api/prompts/:id/like` | Increment like count for a prompt |
| `GET` | `/api/trending` | Get ranked trending prompts (`?period=today\|week\|all`) |
| `GET` | `/api/users/:id` | Get user profile metadata |

### Generate Endpoint — Request Body
```json
{
  "topic": "launch a SaaS product on Product Hunt",
  "category": "Business",
  "tone": "Expert",
  "model": "gemini-2.5-flash"
}
```

---

## 🗂️ Project Structure

```
TrendingPrompt/
├── backend/
│   ├── .env.example        # Safe env template (commit this)
│   ├── .env                # Your secrets (git-ignored)
│   ├── server.js           # Express API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuroraBackground.jsx  # Drifting gradient mesh
│   │   │   ├── Navbar.jsx            # Responsive nav + mobile drawer
│   │   │   ├── PromptCard.jsx        # Glass card with like/save/copy
│   │   │   ├── PromptGenerator.jsx   # Two-pane generate workspace
│   │   │   ├── Toast.jsx             # Toast notification system
│   │   │   └── TrendingTicker.jsx    # Dual-direction marquee
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── Generate.jsx
│   │   │   ├── Trending.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── data/prompts.js           # 32 curated prompts seed data
│   │   └── utils/
│   │       ├── copyPrompt.js
│   │       └── savePrompt.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── .gitignore
├── .gitattributes
└── package.json            # Root scripts (npm run dev)
```

---

## 🎨 Design System

- **Base background** — `#0A0A0F` near-black
- **Gradient accents** — Violet `#8B5CF6` → Cyan `#06B6D4` → Fuchsia `#D946EF`
- **Glassmorphism** — `backdrop-blur`, `bg-white/5` overlays, `border-white/5` borders
- **Aurora mesh** — 3 drifting blobs with custom Tailwind `@keyframes` (GPU-friendly)
- **Fonts** — `Space Grotesk` (headings) · `Inter` (body) via Google Fonts
- **Animations** — Framer Motion spring physics on all interactive elements

---

## 💾 Local Data Persistence

User data is stored in `localStorage` — no sign-up required:

| Key | Contents |
|-----|----------|
| `savedPrompts` | Bookmarked / created prompts |
| `likedPrompts` | Array of liked prompt IDs |
| `userProfile` | Username, bio, social links |

---

## 📄 License

MIT © TrendingPrompt

---

<div align="center">

Built with ❤️ using **React**, **Gemini AI**, and **Tailwind CSS**

</div>
