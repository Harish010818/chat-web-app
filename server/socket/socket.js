import {Server} from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv'; 
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


const userSocketMap = {}; // {userId->socketId}

io.on('connection', (socket)=> {
    
    // console.log('user connnect', socket.id);

    const userId = socket.handshake.query.userId

    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    // console.log("backend se aane waala sokete", userSocketMap);
    
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    // console.log("yhaan v aya ");
    
    socket.on('disconnect', () => {
        // console.log('user disconnected', socket.id);
        
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));    
    })
    
    //console.log("yhaan tak");
})

export {app, io, server};
