import express from 'express';
import { Registration } from '../models/Registration.js';

const router = express.Router();

// Memory store fallback if MongoDB is not running locally
const inMemoryRegistrations = [];

// POST /api/registrations - Register for an event
router.post('/', async (req, res) => {
  try {
    const { eventId, eventTitle, participantName, email, phone, college, teamName } = req.body;

    if (!participantName || !email || !college) {
      return res.status(400).json({ success: false, message: 'Missing required participant fields.' });
    }

    const ticketId = `UMU-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRegistrationData = {
      ticketId,
      eventId: eventId || 'general',
      eventTitle: eventTitle || 'Martinovation TechFest Entry',
      participantName,
      email,
      phone: phone || '',
      college,
      teamName: teamName || '',
      status: 'CONFIRMED',
      registeredAt: new Date(),
    };

    try {
      const doc = await Registration.create(newRegistrationData);
      return res.status(201).json({ success: true, data: doc });
    } catch (dbErr) {
      inMemoryRegistrations.push(newRegistrationData);
      return res.status(201).json({ success: true, data: newRegistrationData, note: 'Saved to memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations/:ticketId - Ticket Lookup
router.get('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;

    try {
      const reg = await Registration.findOne({ ticketId });
      if (reg) return res.json({ success: true, data: reg });
    } catch (dbErr) {}

    const memReg = inMemoryRegistrations.find(r => r.ticketId === ticketId);
    if (memReg) return res.json({ success: true, data: memReg });

    return res.status(404).json({ success: false, message: 'Ticket pass not found.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations - Get all registrations
router.get('/', async (req, res) => {
  try {
    try {
      const list = await Registration.find().sort({ registeredAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    } catch (dbErr) {
      return res.json({ success: true, count: inMemoryRegistrations.length, data: inMemoryRegistrations });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
