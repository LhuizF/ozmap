import mongoose from 'mongoose';
import { env } from '@/core/config/env.config';

export const connectMongoose = async () => {
  const mongoURI = env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
