import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import registrationRoutes from './routes/registrationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api/registrations', registrationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', inquiryRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/checkin', analyticsRoutes); // Mount POST /api/checkin directly

// Health Check API Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'Martinovation 2026 TechFest Platform',
    university: 'Usha Martin University',
    festDates: 'October 5 - October 9, 2026',
    instrumentation: 'CHECK_IN_DATA_AND_ANALYTICS_ACTIVE',
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`⚡ Martinovation Analytics API Server running on port ${PORT}`);
  });
}

export default app;
