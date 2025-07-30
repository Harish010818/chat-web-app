import express from "express";
import { getMyProfile, login, logout, otherUsers, register} from "../controlers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/me").get(isAuthenticated, getMyProfile);
userRouter.route("/").get(isAuthenticated, otherUsers); 

export default userRouter;

