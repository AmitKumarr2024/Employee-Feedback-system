import UserModel from "../Users/user.model.js";
import FeedbackModel from "./feedback.model.js";


export const createFeedback = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    console.log("sender", sender);
    console.log("receiver", receiver);
    console.log("message", message);

    // Check if sender exists and has the role EMPLOYEE or ADMIN
    const senderExists = await UserModel.findById(sender);
    if (!senderExists || (senderExists.role !== "EMPLOYEE" && senderExists.role !== "ADMIN")) {
      return res.status(400).json({ error: "Sender does not exist or is not authorized" });
    }

    // Check if receiver exists and has the role EMPLOYEE or ADMIN
    const receiverExists = await UserModel.findById(receiver);
    if (!receiverExists || (receiverExists.role !== "EMPLOYEE" && receiverExists.role !== "ADMIN")) {
      return res.status(400).json({ error: "Receiver does not exist or is not authorized" });
    }

    const newFeedback = new FeedbackModel({ sender, receiver, message });
    await newFeedback.save();

    return res.status(201).json({
      message: "Feedback sent successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error in createFeedback controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbackList = await FeedbackModel.find().populate("sender receiver"); // Populate sender and receiver details
    return res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error in getFeedback controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedbackBySender = async (req, res) => {
  try {
    const { senderId } = req.params;
    const feedbackList = await FeedbackModel.find({
      sender: senderId,
    }).populate("sender receiver"); // Populate sender and receiver details
    return res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error in getFeedbackBySender controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedbackByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;
    
    const feedbackList = await FeedbackModel.find({
      receiver: receiverId,
    }).populate("sender receiver"); // Populate sender and receiver details
    
    return res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error in getFeedbackByReceiver controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("sender receiver"); // Populate updated feedback

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error("Error in updateFeedback controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFeedback controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



