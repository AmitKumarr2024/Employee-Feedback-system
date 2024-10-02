import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing User instead of Employee
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing User instead of Employee
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update date
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

export default FeedbackModel;
