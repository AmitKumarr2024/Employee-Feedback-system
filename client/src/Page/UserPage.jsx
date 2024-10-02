import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CreateFeedbacks from "../Components/feedback/createFeedbacks";
import { fetchUsers } from "../Store/userSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [isFeedbackVisible, setFeedbackVisible] = useState(false); // Control feedback component visibility

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    setSenderId(data.sender); // Store the sender ID
    setReceiverId(data.receiver); // Store the receiver ID
    setFeedbackVisible(true); // Show feedback component after selection
    console.log("Sender ID:", data.sender);
    console.log("Receiver ID:", data.receiver);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold text-indigo-600 mb-6">
          Send Feedback Request
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Employee Sender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Sender
            </label>
            <select
              {...register("sender", {
                required: "Please select an Employee Sender",
              })}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.sender ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error fetching users</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))
              )}
            </select>
            {errors.sender && (
              <p className="text-red-500 text-xs mt-1">{errors.sender.message}</p>
            )}
          </div>

          {/* Employee Receiver */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Receiver
            </label>
            <select
              {...register("receiver", {
                required: "Please select an Employee Receiver",
              })}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.receiver ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error fetching users</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))
              )}
            </select>
            {errors.receiver && (
              <p className="text-red-500 text-xs mt-1">{errors.receiver.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-200 hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>

        {/* Feedback Component */}
        {isFeedbackVisible && (
          <div className="mt-6">
            <CreateFeedbacks senderId={senderId} receiverId={receiverId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
