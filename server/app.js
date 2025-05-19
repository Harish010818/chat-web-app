import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import bodyParser from "body-parser";
dotenv.config();
connectDB();


// middleware
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true}));


// routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server listen at prot ${PORT}`);
});

