import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import socketServer from "./socket/socket.js"; // ✅ import socket server


dotenv.config();
connectDB();

// Use the existing express app from socketServer
const { app, server } = socketServer;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// APIs
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

const PORT = process.env.PORT || 8000;

// ✅ Start socket-compatible server
server.listen(PORT, () => {
  console.log(`🚀 Server with socket.io listening at http://localhost:${PORT}`);
});
