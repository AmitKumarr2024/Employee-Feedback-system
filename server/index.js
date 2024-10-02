import path from "path";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./config/connectToMongoDb.js";
import UserRoutes from "./components/Users/user.routes.js";
import FeedbackRoutes from "./components/Feedback/feedback.routes.js";

// Set default port if process.env.PORT is undefined
const Port = process.env.PORT || 8001;
const app = express();

// Resolve __dirname
const __dirname = path.resolve();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8001'], // Allow both origins
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // Allow credentials to be sent
  })
);

app.use(express.json());
app.use(cookieParser());
// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all route to serve index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client", "dist", "index.html")); // Fixed to use sendFile
});

// Middleware to parse JSON and cookies

// API routes
app.use("/api/user/", UserRoutes);
app.use("/api/feedback/", FeedbackRoutes);

// Start the server
app.listen(Port, () => {
  connectToMongoDb(); // Ensure MongoDB connection is established
  console.log("Server started successfully at:", Port);
});
