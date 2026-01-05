import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMesaage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(401).json({
        message: "Input field can't be empty",
      });
    }

    let gotConversation = await Conversation.findOne({
      Participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        Participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      // gotConversation.lastMessage = newMessage._id;    // this was the actual bug which was lying here
      let len = gotConversation.messages.length - 1;
      gotConversation.lastMessage = gotConversation.messages[len]._id;
    }

    // await gotConversation.save();
    // await newMessage.save();

    await Promise.all([gotConversation.save(), newMessage.save()]);

    // SOCKET IO INJECTED
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      newMessage,
    });
  } catch (err) {
    console.error(err);
  }
};

// this will handle received messages
export const receiveMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    let conversation = await Conversation.findOne({
      Participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages);
  } catch (err) {
    console.error(err);
  }
};

export const editMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { input } = req.body;

    const message = await Message.findById(messageId);
    const { receiverId } = message;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { message: input },
      { new: true, runValidators: true }
    );

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageEdited", {
        id: updatedMessage._id,
        newText: updatedMessage.message,
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
};

export const unsendMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    const { receiverId, senderId } = message;

    // Delete message from DB
    await Message.findByIdAndDelete(messageId);

    // Find the conversation
    const gotConversation = await Conversation.findOne({
      Participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }

    // Remove messageId from messages array
    gotConversation.messages.pull(messageId);

    // Update lastMessage
    if (gotConversation.messages.length > 0) {
      const lastIdx = gotConversation.messages.length - 1;
      gotConversation.lastMessage = gotConversation.messages[lastIdx];
    } else {
      gotConversation.lastMessage = null;
    }

    await gotConversation.save();

    // Emit socket event
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({
      success: true,
      message: "Message unsent successfully",
    });
  } catch (err) {
    console.error("Error in unsendMessage:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const sendFile = async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const uploadedFileUrl = req.file.path;

  try {

    let gotConversation = await Conversation.findOne({
      Participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        Participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message : uploadedFileUrl,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      let len = gotConversation.messages.length - 1;
      gotConversation.lastMessage = gotConversation.messages[len]._id;
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);
        
    // SOCKET IO INJECTED
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      newMessage,
    });
  } catch (err) {
    console.error(err);
  }
};


// export const deleteMessage = async(req, res) => {
//      try {
//        const messageId = req.params._id;
//        const message =  await Message.findByIdAndUpdate(messageId, {});
//        message.message = "this message was deleted."
//        Message.save();

//        res.status(200).json({
//            success: true,
//            message: "Message deleted successfully"
//        });

//      } catch(err){
//         console.error(err);
//      }
// }