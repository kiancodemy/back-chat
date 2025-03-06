import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";
import connectDB from "./function/connection.js";
import userrouter from "./routes/user.router.js";
import chatrouter from "./routes/chat.router.js";
import { httpServer, app } from "./socket/socket.js";
import Messagerouter from "./routes/Meesage.route.js";

dotenv.config();

app.use(
  cors({
    origin: process.env.REACTapi,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use("/user", userrouter);
app.use("/message", Messagerouter);

app.use("/chats", chatrouter);

const PORT = 4000;

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  connectDB();
});
