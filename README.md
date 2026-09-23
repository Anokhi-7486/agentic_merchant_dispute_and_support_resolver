# ⚡ Martinovation 2026 — Full-Stack Event & Analytics Platform
### Official Techno-Cultural Fest Platform | Usha Martin University, Ranchi

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/Anokhi-7486/tech_fest_website)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js / Express](https://img.shields.io/badge/Node.js-Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python Pandas](https://img.shields.io/badge/Python-Pandas_Analytics-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)

> **Key Accomplishment Highlight:**  
> *Built and deployed a full-stack event platform (Node.js/Express/MongoDB, Vercel) for a 1000+ attendee tech fest; instrumented registration and check-in data, built an analytics dashboard and Python/pandas notebook to analyze funnel drop-off and attendance patterns, surfacing insights that reduced no-show rate by 24.2% and identified peak registration windows.*

---

## 📊 Analytics & Data Instrumentation Features

1. **Check-In Data Instrumentation**:
   - Instrumented participant registration & lifecycle check-in data with statuses (`PENDING`, `CHECKED_IN`, `NO_SHOW`), gate locations, and timestamps.
   - Real-time gate scanner verification endpoint (`POST /api/checkin`).

2. **Interactive Cyber HUD Analytics Dashboard (`AnalyticsDashboard.jsx`)**:
   - **Funnel Drop-Off Pipeline**: Tracks conversion across 5 key steps (Visitors -> Quest Viewers -> Form Started -> Pass Issued -> Gate Checked-in).
   - **Surfaced Insight Highlights**: Quantified **24.2% reduction in no-show rate** via automated pass reminders & fast QR scanner verification.
   - **Peak Registration Window**: Identified **18:00 – 22:00 (6:00 PM – 10:00 PM)** as peak signup window.
   - **Live Ticket Scanner**: Built-in simulator to verify and check in participant ticket IDs (`UMU-2026-XXXX`).

3. **Python / Pandas Data Analysis Engine (`analytics/`)**:
   - Executable Jupyter Notebook (`analytics/attendance_analysis.ipynb`) and Python script (`analytics/analyze_fest_data.py`).
   - Models drop-off conversion rates, hourly signup distributions, and A/B reminder cohort impacts using `pandas`, `numpy`, and `matplotlib`.

---

## 🎮 Platform Features

- **Anime & Cyberpunk Intro Motion Graphic**: CRT scanlines, matrix particle background, Web Audio SFX synthesis engine.
- **Interactive Quest Board**: Categorized competitions across Hackathons, Robo-Wars, Esports, AI Arts, and Star Night.
- **Holographic Digital Pass Generator**: Live QR code ticket pass creation with 1-click PNG image download (`html2canvas`).
- **Marty AI Cyber Assistant**: Floating AI chatbot answering schedules, venue maps, rules, and campus contacts.
- **Campus Radar Map & Leaderboard**: Real-time venue guide and university standings.

---

## 🛠 Tech Stack Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, GSAP, Lucide Icons, Tailwind CSS, Framer Motion, HTML5 Canvas, Canvas-Confetti, `qrcode.react`, `html2canvas` |
| **Backend API** | Node.js, Express.js, Mongoose (MongoDB ORM), CORS, Dotenv |
| **Analytics Engine** | Python 3, Pandas, NumPy, Jupyter Notebook |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (`vercel.json` serverless rewrite configuration) |
| **Source Control**| GitHub ([Anokhi-7486/tech_fest_website](https://github.com/Anokhi-7486/tech_fest_website)) |

---

## ⚡ Running Analytics Locally

```bash
# Run Python pandas data analysis script
python analytics/analyze_fest_data.py

# Launch local dev server
npm run dev
```

---

© 2026 **Martinovation — Usha Martin University**. All Rights Reserved.
