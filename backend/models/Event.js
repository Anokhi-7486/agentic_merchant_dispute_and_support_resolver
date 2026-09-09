import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  badge: { type: String },
  difficulty: { type: String },
  prize: { type: String, required: true },
  entryFee: { type: String },
  teamSize: { type: String },
  date: { type: String },
  time: { type: String },
  venue: { type: String },
  shortDesc: { type: String },
  description: { type: String },
  rules: [{ type: String }],
});

export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
