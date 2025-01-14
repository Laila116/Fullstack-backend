import express from "express";
import cors from "cors";
import { router } from "./route/route.js";
import { connectToDatabase } from "./databaseConnection/postgres.js";
import { connectToMongoDB } from "./databaseConnection/mongoDB.js";
import dotenv from "dotenv";
import errorHandler from "./controller/errorHandler.js"

dotenv.config({ path: '../.env' });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello from the backend 1234!");
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});

async function tryPostgresConnection() {
  if (!(await connectToDatabase())) {
    setTimeout(() => tryPostgresConnection(), 5000);
    console.log("Retry in 5sec");
  } else {
    console.log("Connection to PostgresDB successful!");
  }
}

async function tryMongoDBConnection() {
  if (!(await connectToMongoDB())) {
    setTimeout(() => tryMongoDBConnection(), 5000);
    console.log("Retry in 5sec");
  } else {
    console.log("Connection to MongoDB successful!");
  }
}

tryPostgresConnection();
tryMongoDBConnection();
