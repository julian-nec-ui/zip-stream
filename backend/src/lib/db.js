import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`.yellow.underline.bold);
  } catch (error) {
    console.error("Error connecting to MongoDb : ",error);
    process.exit(1);
  }
}