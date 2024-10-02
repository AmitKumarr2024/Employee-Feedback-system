import path from 'path';
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
    origin: process.env.CLIENT_URL, // Ensure this environment variable is set in Render
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // Allow credentials to be sent
  })
);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all route to serve index.html for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // Fixed to use sendFile
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user/", UserRoutes);
app.use("/api/feedback/", FeedbackRoutes);

// Start the server
app.listen(Port, () => {
  connectToMongoDb(); // Ensure MongoDB connection is established
  console.log("Server started successfully at:", Port);
});
