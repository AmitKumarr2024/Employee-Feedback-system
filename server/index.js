import path from 'path';
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./config/connectToMongoDb.js";
import UserRoutes from "./components/Users/user.routes.js";
import FeedbackRoutes from "./components/Feedback/feedback.routes.js";

const Port = process.env.PORT; // Use a default port if process.env.PORT is undefined
const app = express(); // Remove "new", it's not needed with express()
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true, // Allow credentials to be sent
  })
);

app.use(express.static(path.join(__dirname, "client/dist")));




app.use(express.json());
// Add this middleware
app.use(cookieParser());

// Api routes

app.use("/api/user/", UserRoutes);


// feedback route
app.use("/api/feedback/", FeedbackRoutes);


// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>Hi Amit, How are You?</h1>");
// });

app.listen(Port, () => {
  connectToMongoDb();
  console.log("Server Started Successfully At :", Port);
});
