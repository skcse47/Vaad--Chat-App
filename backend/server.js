// const express = require("express");
// const env = require("dotenv")
import  express from "express";
import  dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDb from "../db/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;
    
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


app.listen(5000, () => {
    connectToMongoDb();
    console.log(`Server is running on ${PORT}`)
})