import { Server } from "socket.io";
import http from "http";
import express from "express";

const app  = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

export function getReciverSocketId(userId){
    return userSocketMap[userId];
}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id; 
    io.emit("getOnlineUser",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("A user disconnected ",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser",Object.keys(userSocketMap));
    })
})
export {io,app,server};