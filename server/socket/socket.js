import http from "http";
import { Server } from "socket.io"; // fix import
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // NOT PORT
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketId = (receiverId) => {
     return userSocketMap[receiverId];
} 


const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    io.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        delete userSocketMap[userId];

        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

});

export default { app, server, io };
