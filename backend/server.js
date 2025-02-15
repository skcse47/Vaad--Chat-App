// const express = require("express");
// const env = require("dotenv")
import  express from "express";
import  dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import getAllUsers from "./routes/user.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js";
import { server, app } from "./socket/socket.js";
import path from "path";
import passport from "./middleware/passport.js"; // Import Passport Config
import session from "express-session";

// const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(session({ 
    secret: process.env.JWT_SECRET_KEY, 
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }  // Secure should be true in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", getAllUsers);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})


server.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on ${PORT}`)
})