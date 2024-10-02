import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Store/userSlice";
import ReceiverDashboard from "../Components/feedback/ReceiverDashboard";
import FeedbackComponent from "../Components/feedback/FeedbackComponent";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Use useSelector to access users from the Redux store
  const {
    users,
    loading: loadingUsers,
    error: errorUsers,
  } = useSelector((state) => state.users);

  // Fetch feedback list from the Redux store
  const { feedbackList, loading: loadingFeedback, error: errorFeedback } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch,feedbackList]);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        {/* Dashboard report */}
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <div className="w-64 h-28 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl shadow-lg flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold">{users.length}</span>
            <span className="text-lg font-semibold">Total Employees</span>
          </div>
          <div className="w-64 h-28 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-xl shadow-lg flex flex-col items-center justify-center">
            {/* Display feedback count */}
            <span className="text-4xl font-extrabold">{feedbackList?.length || 0}</span>
            <span className="text-lg font-semibold">Total Feedbacks Created</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Employee List Section */}
        <div className="w-full h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-full flex flex-col">
            <h1 className="bg-indigo-500 text-white text-2xl font-bold p-4 text-center">
              List of Total Employees
            </h1>
            <div className="p-6 overflow-y-auto space-y-4">
              {loadingUsers ? (
                <p className="text-center text-blue-500">Loading users...</p>
              ) : errorUsers ? (
                <p className="text-center text-red-500">
                  Error fetching data: {errorUsers}
                </p>
              ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No employees found.</p>
              ) : (
                users.map((emp) => (
                  <div
                    key={emp._id}
                    className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600 shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold">Employee Name:</span>
                      <span className="text-gray-800">{emp.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-700 font-bold">Employee Role:</span>
                      <span className="text-gray-800">{emp.role}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Feedback List Section */}
        <div className="w-full h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-full flex flex-col">
            <h1 className="bg-indigo-500 text-white text-2xl font-bold p-4 text-center">
              List of Feedbacks
            </h1>
            <div className="p-6 overflow-y-auto">
              <FeedbackComponent/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
