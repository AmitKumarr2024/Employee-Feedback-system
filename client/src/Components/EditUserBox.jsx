import React, { useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import useEditUser from "../hook/useEditUser"; // Assuming this is for user update
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const EditBox = ({ user, onClose, fetchUsers }) => {
  const dispatch = useDispatch();
 
  const {
    editUser,
    loading: loadingUser,
    error: userError,
    success: userSuccess,
  } = useEditUser(); // Custom hook for user updates

  // Form handling with react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: user ? user._id : "",
      fullName: user ? user.fullName || user.name : "",
      email: user ? user.email : "",
      gender: user ? user.gender : "",
      role: user ? user.role : "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    if (user) {
      editUser(user._id, data); // Update user using custom hook
    }
  };

  // Reset form and state after successful update
  useEffect(() => {
    if (userSuccess) {
      reset(); // Reset the form fields
      onClose(); // Close the modal
      fetchUsers(); // Refresh the user list
      toast.success("User updated successfully");
    }
  }, [userSuccess, reset, onClose, fetchUsers]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-cyan-100 bg-opacity-80 z-10">
      <div className="relative bg-white shadow-lg p-6 rounded-md max-w-md w-full">
        <button
          className="absolute top-3 right-3 p-2 text-2xl hover:text-red-600"
          onClick={onClose}
        >
          <FaWindowClose />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              {...register("fullName", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="border p-2 rounded w-full"
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              {/* Add more roles if needed */}
            </select>
          </div>
          <button
            type="submit"
            disabled={loadingUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loadingUser ? "Updating..." : "Update"}
          </button>
          {userError && (
            <p className="text-red-600 mt-2">Error: {userError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditBox;
