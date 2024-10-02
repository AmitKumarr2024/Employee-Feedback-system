import React from "react";
import { useNavigate } from "react-router-dom";
import useUserData from "../hook/useUserData ";

const Admin = () => {
  const { user, loading, error } = useUserData();
  const navigate = useNavigate();

  // If loading user data, display a loader
  if (loading) return <p>Loading...</p>;

  // If there is an error, display it
  if (error) return <p>Error: {error}</p>;

  // If the user is not admin, display a message
  if (user && user.data.role !== "ADMIN") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-300 bg-opacity-90 ">
        <div className="text-center">
          <p className="text-xl font-bold text-red-600">You are not an admin</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // If user is an admin
  return (
    <div className="relative h-[74.6vh] flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-gray-300 rounded-lg flex flex-col items-center justify-center space-y-4 p-4">
        <p className="text-2xl font-bold text-green-600">Welcome, Admin!</p>
        <p className="text-xl">You have full access to the admin panel.</p>
        
      </div>
    </div>
  );
};

export default Admin;
