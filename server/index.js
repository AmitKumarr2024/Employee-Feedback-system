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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true, // Allow credentials to be sent
  })
);
app.use(express.json());
// Add this middleware
app.use(cookieParser());

// Api routes

app.use("/api/user/", UserRoutes);


// feedback route
app.use("/api/feedback/", FeedbackRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>Hi Amit, How are You?</h1>");
// });

app.listen(Port, () => {
  connectToMongoDb();
  console.log("Server Started Successfully At :", Port);
});
