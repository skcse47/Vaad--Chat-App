import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
// console.log("Www");return
const io = new Server(server, {
    cors: {
        origin: ["https://localhost:5173"],
        methods: ["GET", "POST"],
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


// {"userId": "socket.id"}
var userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit("onlineUsers", Object.keys(userSocketMap));
    // socket.on() is used to listen to the events. Can be used both at client and server end.
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });
});




export {app, server, io}
