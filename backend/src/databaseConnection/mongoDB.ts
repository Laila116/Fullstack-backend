import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

async function connectToMongoDB(): Promise<boolean> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Erfolgreich mit MongoDB verbunden!");
    return true;
  } catch (error) {
    console.error("Fehler beim Verbinden mit MongoDB", error);
    return false;
  }
}

export { connectToMongoDB };
