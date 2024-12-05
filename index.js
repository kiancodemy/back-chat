import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./function/connection.js";

dotenv.config();

// Initialize app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the chat app!");
});
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
