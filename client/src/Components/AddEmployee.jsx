// AddEmployee.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast"; // Import toast
import AuthForm from "./AuthForm";
import { fetchUsers } from "../Store/userSlice";
import useSignupUser from "../hook/useSignupUser "; // Import your custom hook
import EditUserBox from "./EditUserBox";
import formateDate from "../helper/formateDate";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [openEditBox, setOpenEditBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, loading, error } = useSelector((state) => state.users);

  console.log("user", users);

  // Use the signup hook
  const {
    signupUser,
    loading: signupLoading,
    error: signupError,
    success,
  } = useSignupUser();

  // Function to handle the submission of the employee form
  const handleEmployeeSubmit = async (data) => {
    await signupUser(data); // Call the signup hook

    if (signupError) {
      toast.error(`Signup Error: ${signupError}`); // Show error toast
      console.error("Signup Error:", signupError); // Log any errors
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditBox(true);
  };
  const handleCloseEditBox = () => {
    setOpenEditBox(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    // This will run when the signup is successful
    if (success) {
      toast.success("Employee added successfully!"); // Show success toast
      dispatch(fetchUsers()); // Refresh the users after successful submission
    }
  }, [success, dispatch]); // Trigger the effect when success changes

  return (
    <div className="min-h-screen bg-gray-100 ">
      <h2 className="text-4xl font-bold text-center text-fuchsia-700 py-4">
        Add New Employee
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add New Employee Section */}

        <AuthForm formType="signup" onSubmit={handleEmployeeSubmit} />
        {signupLoading && (
          <p className="text-center text-gray-600 mt-3 text-sm">
            Signing up...
          </p>
        )}

        {/* Employee List Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 duration-300 overflow-y-scroll h-[595px]">
          <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-4">
            Employee List
          </h2>
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          <ul className="my-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center border-b py-4  my-3 rounded-xl px-6 shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              >
                {user.profilePic && (
                  <img
                    src={user.profilePic}
                    alt={`${user.fullName}'s profile`}
                    className="w-10 h-10 rounded-full mr-4 border border-fuchsia-500"
                  />
                )}
                <div className="flex flex-row w-full justify-between items-center">
                  <span className="text-gray-800 font-semibold">
                    {user.fullName}
                  </span>
                  <div className="flex flex-col justify-end items-end">
                    <span className="text-gray-600 ml-2 font-bold text-base"> {user.role}</span>
                    <span className=" ml-2 text-[0.2rem] font-extrabold text-blue-600">
                      {" "}
                      {formateDate(user.createdAt)}
                    </span>
                  </div>
                </div>
                  <button className="px-4 py-2 bg-fuchsia-700 ml-6 rounded-3xl hover:bg-fuchsia-500 hover:text-white font-bold" onClick={() => handleEditUser(user)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {openEditBox && (
        <EditUserBox
          user={selectedUser}
          onClose={handleCloseEditBox}
          fetchUsers={() => dispatch(fetchUsers())}
        />
      )}
    </div>
  );
};

export default AddEmployee;
