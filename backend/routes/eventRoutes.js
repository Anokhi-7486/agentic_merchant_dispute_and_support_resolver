import express from 'express';
import { Event } from '../models/Event.js';
import { FEST_DATA } from '../../src/data/festData.js';

const router = express.Router();

// GET /api/events - List all events
router.get('/', async (req, res) => {
  try {
    try {
      const dbEvents = await Event.find();
      if (dbEvents && dbEvents.length > 0) {
        return res.json({ success: true, data: dbEvents });
      }
    } catch (dbErr) {}

    return res.json({ success: true, data: FEST_DATA.events });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/events/:id - Get specific event details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const event = await Event.findOne({ id });
      if (event) return res.json({ success: true, data: event });
    } catch (dbErr) {}

    const staticEvt = FEST_DATA.events.find(e => e.id === id);
    if (staticEvt) return res.json({ success: true, data: staticEvt });

    return res.status(404).json({ success: false, message: 'Event not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
