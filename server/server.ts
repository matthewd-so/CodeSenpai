require("dotenv").config();
import express from "express";
import cors from "cors";
import router from "./routes/index";
import mongoose from "mongoose";
import { customCors } from "./middlewares/cors";

const MONGODB_URI = process.env.MONGODB_URI || "";
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const app: express.Application = express();
const port = process.env.PORT || 80;

app.use(customCors);
app.use(express.json());

// Add your /api/problems route here
app.get('/api/problems', (req, res) => {
  const problems = [
    {
      id: 1,
      name: 'two-sum',
      difficulty: 'easy',
      acceptance_rate_count: 85,
      status: 'solved',
      like_count: 200,
      dislike_count: 5,
      is_starred: true
    },
    {
      id: 2,
      name: 'add-two-numbers',
      difficulty: 'medium',
      acceptance_rate_count: 70,
      status: 'attempted',
      like_count: 150,
      dislike_count: 15,
      is_starred: false
    }
  ];
  res.json(problems);
});

// Include your other routes here
app.use("/api", router);

app.listen(port, () => {
    console.log(`server listening at port: ${port}`);
});
