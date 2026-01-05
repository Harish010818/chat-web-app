import express from "express";
import { getMyProfile, login, logout, otherUsers, register, uploadFile} from "../controlers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {uploadProfile} from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/me").get(isAuthenticated, getMyProfile);
userRouter.route("/").get(isAuthenticated, otherUsers); 
userRouter.post("/upload-profile/:id", uploadProfile , uploadFile);
 

export default userRouter;