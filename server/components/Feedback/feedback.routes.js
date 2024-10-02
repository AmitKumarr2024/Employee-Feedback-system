import express from "express";
import {
  createFeedback,
  getFeedback,
  getFeedbackBySender,
  updateFeedback,
  deleteFeedback,
  getFeedbackByReceiver,
} from "./feedback.controller.js"; // Import your feedback controller

const routes = express.Router();

// Create a new feedback
routes.post("/createFeedback", createFeedback);

// Get all feedback
routes.get("/feedbackAll", getFeedback);

// Get feedback by sender ID
routes.get("/feedback/sender/:senderId", getFeedbackBySender);

routes.get("/feedback/receiver/:receiverId", getFeedbackByReceiver);

// Update feedback by ID
routes.put("/feedback/:id", updateFeedback);

// Delete feedback by ID
routes.delete("/feedback/:id", deleteFeedback);

export default routes;
