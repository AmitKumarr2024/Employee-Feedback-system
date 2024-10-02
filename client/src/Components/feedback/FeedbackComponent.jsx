import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../../Store/feedbck/getAllFeedbackSlice";

const FeedbackComponent = () => {
  const dispatch = useDispatch();
  const { feedbackList, loading, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Feedback List</h1>
      {loading && (
        <div className="flex justify-center">
          <p className="text-blue-500 text-lg">Loading feedback...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      )}
      {feedbackList.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-gray-500 text-lg">No feedback available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackList.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                From: {feedback.sender ? feedback.sender.fullName : "Unknown Sender"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">Message:</span> {feedback.message}
              </p>
              <p className="text-xs text-gray-500">
                Sent on: {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;
