import { createServer } from "http";
import { Server } from "socket.io";

import express from "express";
export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.REACTapi,
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(`socket to server ${socket.id}`);
  socket.on("setup", (user) => {
    socket.join(user._id);
  });
  socket.emit("connected");
  socket.on("chat-join", (chatid) => {
    socket.join(chatid);
    console.log(`it is join chat id with${chatid}`);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });
  socket.on("new-message", (data) => {
    const { participants, Newdata } = data;
    participants?.forEach((user) => {
      if (user._id === Newdata.sender._id) {
        return;
      } else {
        socket.in(user._id).emit("recieved-message", Newdata);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("server disconnected");
  });
});
