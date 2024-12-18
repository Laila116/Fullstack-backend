import mongoose from 'mongoose';
//import dotenv from 'dotenv';
//dotenv.config();

//const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
const MONGO_URI = 'mongodb://localhost:27017/mydatabase';

async function connectToMongoDB(): Promise<Boolean> {
try {
    mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
    return true;
} catch (authError) {
    console.error('Fehler beim Authentifizieren zur MongoDB');
}
return false;
}

export {connectToMongoDB};

  