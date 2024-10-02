import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUsers } from "../Store/userSlice";
import { fetchAllFeedback } from "../Store/feedbck/getAllFeedbackSlice"  // Corrected folder name
import ReceiverDashboard from "./feedback/ReceiverDashboard";
import { createFeedback } from "../Store/feedbck/feedbackSlice";
import { Toaster, toast } from "react-hot-toast";

const AddFeedback = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  
  const {
    feedbackList = [],
    loading: feedbackLoading,
    error: feedbackError,
  } = useSelector((state) => state.feedbackList || {});

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const feedbackData = {
      sender: data.employeeSender,
      receiver: data.employeeReceiver,
      message: data.message,
    };

    dispatch(createFeedback(feedbackData))
      .then(() => {
        toast.success("Feedback sent successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);  // Log the error
        toast.error("Failed to send feedback. Please try again.");
      });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-purple-200 to-blue-300">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-full max-w-md shadow-2xl bg-white rounded-3xl p-8 transition-transform duration-300 transform hover:scale-105">
            <h1 className="w-full text-center bg-gradient-to-r from-indigo-400 to-blue-500 px-6 py-4 rounded-2xl text-xl font-bold text-white">
              Send Feedback Request
            </h1>
            <hr className="my-4 border-gray-300" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
              {/* Employee Sender */}
              <div className="flex flex-col">
                <label htmlFor="employeeSender" className="font-medium">
                  Employee Sender
                </label>
                <select
                  id="employeeSender"
                  {...register("employeeSender", { required: "Please select an employee." })}
                  className="w-full h-12 border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                >
                  <option value="">Select</option>
                  {usersLoading ? (
                    <option>Loading...</option>
                  ) : usersError ? (
                    <option>Error fetching users</option>
                  ) : (
                    users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Employee Receiver */}
              <div className="flex flex-col">
                <label htmlFor="employeeReceiver" className="font-medium">
                  Employee Receiver
                </label>
                <select
                  id="employeeReceiver"
                  {...register("employeeReceiver", { required: "Please select an employee." })}
                  className="w-full h-12 border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                >
                  <option value="">Select</option>
                  {usersLoading ? (
                    <option>Loading...</option>
                  ) : usersError ? (
                    <option>Error fetching users</option>
                  ) : (
                    users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Please enter a message." })}
                  className="w-full h-32 border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={feedbackLoading}  // Disable if feedback is being processed
                className={`bg-blue-600 text-white w-full py-3 rounded-2xl hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 ${feedbackLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Feedback List */}
        <div className="flex items-center justify-center ">
          <div className="relative min-h-[260px] w-full shadow-2xl bg-white rounded-3xl p-2 overflow-y-auto transition-transform duration-300 transform hover:scale-105">
            <h1 className="w-full text-center bg-gradient-to-r from-indigo-400 to-blue-500 px-6 py-4 rounded-2xl text-xl font-bold text-white sticky top-0">
              List of Feedback Sent Requests
            </h1>
            <hr className="my-4 border-gray-300" />
            {/* ReceiverDashboard */}
            <ReceiverDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
