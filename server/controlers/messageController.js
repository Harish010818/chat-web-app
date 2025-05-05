import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMesaage =  async(req, res) => {
    try {   
       const senderId = req.id;
       const receiverId = req.params.id;
       const { message } = req.body;

       if(!message){
          return res.status(401).json({
               message : "Input field can't be empty" 
          })
       }

       let gotConversation = await Conversation.findOne ({
            Participants : {$all : [senderId, receiverId]}
       })
        
        if(!gotConversation){
            gotConversation = await Conversation.create({
            Participants :  [senderId, receiverId]
        })
     }
       

       const newMessage = await Message.create({
            senderId,
            receiverId,
            message
       })
       
       if(newMessage) {
          gotConversation.messages.push(newMessage._id);
       }

       await gotConversation.save();

       return res.status(200).json({
            newMessage
       })

     }  
       catch(err){
             console.error(err);  
   }     
} 


// this will handle received messages
export const receiveMessage = async(req, res) => {
       try {
           const receiverId = req.params.id;
           const senderId = req.id;

           let conversation = await Conversation.findOne({
               Participants : {$all : [senderId, receiverId]}
          }).populate("messages");
          
          return res.status(200).json(conversation?.messages);

       }  catch(err){
          console.error(err);
       }
}