import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackByReceiver } from "../../Store/feedbck/fetchFeedbackByReceiver";
import { decodeToken } from "../../helper/decodeToken";
import { addNotification } from "../../Store/notificationSlice "; // Import the notification action
import toast from "react-hot-toast";

const ReceiverDashboard = () => {
  const dispatch = useDispatch();
  const { feedbackList, loading, error } = useSelector(
    (state) => state.feedback
  );

  const loggedInUserId = localStorage.getItem("token");
  const decodedToken = decodeToken(loggedInUserId);

  useEffect(() => {
    if (loggedInUserId) {
      dispatch(fetchFeedbackByReceiver(decodedToken._id));
    }
  }, [dispatch, loggedInUserId]);

  useEffect(() => {
    // Notify user when feedback is received
    if (feedbackList.length > 0) {
      feedbackList.forEach((feedback) => {
        // Check if both feedback.receiver and feedback.sender exist before accessing their properties
        if (feedback.receiver && feedback.receiver._id === decodedToken._id) {
          if (feedback.sender) {
            dispatch(addNotification({ message: `You received feedback from ${feedback.sender.fullName}` }));
            toast.success(`You received feedback from ${feedback.sender.fullName}`);
          } else {
            dispatch(addNotification({ message: "You received feedback from an unknown sender" }));
            toast.success("You received feedback from an unknown sender");
          }
        }
      });
    }
  }, [feedbackList, decodedToken._id, dispatch]);

  useEffect(() => {
    feedbackList.forEach(feedback => {
      console.log("Feedback:", feedback);
    });
  }, [feedbackList]);

  
  return (
    <div className="p-6 bg-gray-100 h-[370px] rounded-2xl w-full overflow-y-scroll ">
      {/* Loading and Error States */}
      {loading && (
        <p className="text-center text-blue-500">Loading feedback...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && feedbackList.length === 0 && (
        <p className="text-center text-gray-500">No feedback requests found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {feedbackList.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-purple-600"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {/* Check if feedback.sender exists before accessing fullName */}
                From:{" "}
                {feedback.sender ? feedback.sender.fullName : "Unknown Sender"}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Message:</span> {feedback.message}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Sent on:</span>{" "}
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverDashboard;
