import mongoose from 'mongoose';

export const connectMongoose = async () => {
  const mongoURI = process.env.MONGO_URI;
  console.log(mongoURI);
  if (!mongoURI) {
    console.error('MONGO_URI not defined in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
