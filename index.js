import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./function/connection.js";
import userrouter from "./routes/user.router.js";
import chatrouter from "./routes/chat.router.js";

dotenv.config();

// Initialize app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use("/user", userrouter);
app.use("/chats", chatrouter);

app.get("/", (req, res) => {
  res.send("Welcome to the chat app!");
});
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
