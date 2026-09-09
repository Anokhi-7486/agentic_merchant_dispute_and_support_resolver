# ⚡ Martinovation 2026 — Genesis of Tomorrow
### Official Techno-Cultural Fest Platform | Usha Martin University, Ranchi

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/Anokhi-7486/tech_fest_website)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Express Backend](https://img.shields.io/badge/Node.js-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Martinovation 2026** is the next-generation, high-performance techno-cultural fest platform for **Usha Martin University**, taking place from **October 5 to October 9, 2026**. Designed with an **Anime & Cyberpunk Arcade HUD aesthetic**, full web audio SFX synthesis, interactive GSAP motion feel, live QR pass generator, AI companion, and Express + MongoDB API.

---

## 🎮 Key Features

1. **Anime & Cyberpunk Intro Motion Graphic**:
   - Audio initialization prompt, matrix particle canvas, and "Genesis of Tomorrow" neon text reveal.
2. **Interactive Event Quest Matrix**:
   - Filterable quest cards across Hackathons, Robo-Wars, Esports, Creative AI Arts, and Star Night with rules, prize money, and registration form.
3. **Cyberpunk Digital Pass Generator (Gamified NFT/QR Pass)**:
   - Dynamic user ticket card with user avatar, custom registration ID (`UMU-2026-XXXX`), live QR code, and one-click PNG download (`html2canvas`).
4. **Marty AI — TechFest Cyber Assistant**:
   - Floating AI chatbot widget offering instant inquiries on schedules, rules, venue maps, and team contacts.
5. **Live University Leaderboard & Stats**:
   - Real-time standings of participating institutions and prize pool meter (₹5,00,000+).
6. **Campus Venue Radar Map**:
   - Interactive radar guide to UMU campus arenas (Main Cyber Auditorium, CS Innovation Bay, Mech Cage, Esports Dome).
7. **Node.js + Express + MongoDB Backend API**:
   - Serverless REST API endpoints for event registrations, inquiry management, ticket lookup, and DB seeding.

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, GSAP, Lucide Icons, Tailwind CSS, Framer Motion, HTML5 Canvas, Canvas-Confetti, `qrcode.react`, `html2canvas`.
- **Backend API**: Node.js, Express.js, Mongoose (MongoDB ORM), CORS, Dotenv.
- **Database**: MongoDB Atlas (Cloud database).
- **Deployment**: Configured for Vercel deployment via `vercel.json` and serverless Express API function.

---

## 🛠 Local Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI (or local MongoDB)

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/Anokhi-7486/tech_fest_website.git
cd tech_fest_website

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add MONGODB_URI=your_mongodb_atlas_connection_string

# Run local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | API Health & Fest Status |
| `GET` | `/api/events` | List all fest events |
| `GET` | `/api/events/:id` | Get details of a specific quest |
| `POST` | `/api/registrations` | Register participant for an event |
| `GET` | `/api/registrations/:ticketId` | Lookup digital ticket pass details |
| `POST` | `/api/contact` | Submit contact helpdesk inquiry |

---

## 🌐 Deploying to Vercel

1. Push code to your GitHub repo: `https://github.com/Anokhi-7486/tech_fest_website`.
2. Import project into [Vercel Dashboard](https://vercel.com).
3. Set Environment Variable: `MONGODB_URI` = `mongodb+srv://<user>:<password>@cluster.mongodb.net/martinovation2026`.
4. Deploy! Vercel automatically detects `vercel.json` and builds both React SPA and Express Serverless API.

---

© 2026 **Martinovation — Usha Martin University**. All Rights Reserved.
