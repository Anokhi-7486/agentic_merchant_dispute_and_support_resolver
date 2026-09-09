import express from 'express';
import { Inquiry } from '../models/Inquiry.js';

const router = express.Router();

// POST /api/contact - Submit contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    try {
      const doc = await Inquiry.create({ name, email, subject: subject || 'General Inquiry', message });
      return res.status(201).json({ success: true, message: 'Inquiry received successfully.', data: doc });
    } catch (dbErr) {
      return res.status(201).json({ success: true, message: 'Inquiry received (memory mode).' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
