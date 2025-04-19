import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";


dotenv.config();
connectDB();

const app = express();


const PORT = process.env.PORT || 8000;

app.listen(PORT , ()=> {
    console.log(`listen at port ${PORT}`);
})