import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extends : true}));

app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Restful apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

const PORT = process.env.PORT || 8000;


app.listen(PORT, ()=> {
    console.log(`listen at port ${PORT}`);
})