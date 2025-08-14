import express from "express";
// import { allMessages, receiveMessage, sendMesaage } from "../controlers/messageController.js";
import {editMessage, receiveMessage, sendMesaage, unsendMessage } from "../controlers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const messageRouter = express.Router();

messageRouter.route("/send/:id").post(isAuthenticated, sendMesaage);
messageRouter.route("/:id").get(isAuthenticated, receiveMessage);
messageRouter.route("/:id").delete(isAuthenticated, unsendMessage);
messageRouter.route("/:id").put(isAuthenticated, editMessage);

// messageRouter.route("/").get(isAuthenticated, allMessages);

export default messageRouter;
