import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
      Participants : [ {type : mongoose.Schema.Types.ObjectId, ref : "User"} ],
      messages : [ {type : mongoose.Schema.Types.ObjectId, ref : "Message"} ],
      lastMessage : { type: mongoose.Schema.Types.ObjectId, ref: "Message" } 
      
},{ timestamps: true })

export const Conversation = mongoose.model('Conversation', conversationModel);