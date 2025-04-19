import express from "express";
import { register } from "../controlers/userControllers.js";

const userRout = express.Router();
userRout.route("/register").post(register);

export default userRout;

