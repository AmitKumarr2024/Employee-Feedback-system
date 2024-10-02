import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeedback } from "../../Store/feedbck/getAllFeedbackSlice";

const AllFeedback = () => {
  const dispatch = useDispatch();

  const { feedbackList, loading, error } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Feedback List</h2>
      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback.id}>
            {feedback.senderName} sent feedback to {feedback.receiverName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFeedback;
