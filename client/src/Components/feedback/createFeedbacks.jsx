import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFeedback } from "../../Store/feedbck/feedbackSlice"; // Correct import path
import toast from "react-hot-toast";

const CreateFeedbacks = ({ senderId, receiverId }) => {
  const [feedbackData, setFeedbackData] = useState({
    message: "",
    sender: senderId,
    receiver: receiverId,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      await dispatch(createFeedback(feedbackData));
      setFeedbackData({ message: "", sender: senderId, receiver: receiverId });
      toast.success("Feedback created successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to create feedback. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Create Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedbackData.message}
          onChange={(e) =>
            setFeedbackData({ ...feedbackData, message: e.target.value })
          }
          placeholder="Enter feedback"
          required
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Feedback message"
        />
        <button
          type="submit"
          className={`mt-2 w-full bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateFeedbacks;
