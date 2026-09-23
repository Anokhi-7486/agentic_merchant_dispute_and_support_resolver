import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  participantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'CONFIRMED',
  },
  checkInStatus: {
    type: String,
    enum: ['PENDING', 'CHECKED_IN', 'NO_SHOW'],
    default: 'PENDING',
  },
  checkedInAt: {
    type: Date,
    default: null,
  },
  checkInGate: {
    type: String,
    default: 'MAIN_GATE_ALPHA',
  },
  reminded: {
    type: Boolean,
    default: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

export const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
