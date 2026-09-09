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
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

export const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
