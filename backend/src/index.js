import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/messageRoute.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import {app,server} from "./lib/socket.js";
import path from "path";

// const app = express();
dotenv.config();

const PORT = process.env.PORT;
const __direname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// CORS middleware (global configuration)
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));

// Optionally, add custom headers for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Frontend URL
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow methods
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Requested-With"); // Allow specific headers
    next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__direname,"../frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__direname,"..frontend","dist","index.html "))
    })
}

server.listen(PORT, () => {
    console.log("Server is running on " + PORT);
    connectDB();
});
