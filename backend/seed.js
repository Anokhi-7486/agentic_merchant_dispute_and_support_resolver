import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Event } from './models/Event.js';
import { FEST_DATA } from '../src/data/festData.js';

dotenv.config();

const seedEvents = async () => {
  try {
    await connectDB();
    await Event.deleteMany({});
    await Event.insertMany(FEST_DATA.events);
    console.log('✅ Successfully seeded Martinovation 2026 events into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedEvents();
