import mongoose from 'mongoose';

export const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/martinovation2026';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. API operating with fallback memory store.`);
    return false;
  }
};
