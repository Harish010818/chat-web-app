import express from "express";
// import { allMessages, receiveMessage, sendMesaage } from "../controlers/messageController.js";
import {editMessage, receiveMessage, sendFile, sendMesaage, unsendMessage } from "../controlers/messageController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { uploadFile } from "../middleware/upload.js" 

const messageRouter = express.Router();

messageRouter.route("/send-text/:id").post(isAuthenticated, sendMesaage);
messageRouter.route("/:id").get(isAuthenticated, receiveMessage);
messageRouter.route("/:id").delete(isAuthenticated, unsendMessage);
messageRouter.route("/:id").put(isAuthenticated, editMessage);

//messageRouter.route("/").get(isAuthenticated, allMessages);

messageRouter.post("/send-file/:id", isAuthenticated, uploadFile, sendFile);

export default messageRouter;