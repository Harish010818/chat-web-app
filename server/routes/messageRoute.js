import express from "express";
import { receiveMessage, sendMesaage } from "../controlers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const messageRouter = express.Router();

messageRouter.route("/send/:id").post(isAuthenticated, sendMesaage);
messageRouter.route("/:id").get(isAuthenticated, receiveMessage);

export default messageRouter;
