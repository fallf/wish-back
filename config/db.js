import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  try {
    if (!mongoURI) {
      throw new Error("MongoDB URI is missing. Check .env file.");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
