import express from 'express';
import { connectToDatabase} from './database.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from the backend 1234!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function tryDatabaseConnection() {
    if (!await connectToDatabase()) {
        setTimeout(() => tryDatabaseConnection(), 5000);
        console.log("Retry in 5sec");
    } else {
        console.log("Connection successful!");
    }
}

tryDatabaseConnection();