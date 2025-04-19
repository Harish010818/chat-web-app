import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
      users : [
        {
           type : mongoose.Schema.Types.ObjectId,
           ref : "User"
        }
      ],

      messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message" 
        }       
      ]  
})

export const Contvarsation = mongoose.model('Conversation', conversationModel)