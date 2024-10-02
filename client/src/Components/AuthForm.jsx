import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AuthForm = ({ formType, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize the form
  const {
    register,
    handleSubmit,
    reset, // Import reset function
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data); // Call parent function to handle data
    reset(); // Clear the form fields after submission
  };

  return (
    <div className="flex justify-center items-center  min-w-[600px] ">
      <div className="bg-white shadow-lg rounded-lg p-8  w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {formType === "signup" ? "Create an Account" : "Login"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-1">
          {/* Full Name field only for Signup */}
          {formType === "signup" && (
            <>
              <div className="flex w-full flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className={`mt-1 p-2 border rounded-md w-full ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Gender field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  {...register("gender", {
                    required: "Please select a gender",
                  })}
                  className={`mt-1 p-2 border rounded-md w-full ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Role field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Role
                </label>
                <select
                  {...register("role", { required: "Please select a Role" })}
                  className={`mt-1 p-2 border rounded-md w-full ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              {/* Password field */}
              <div className="flex flex-col ">
                <label className="text-sm font-medium text-gray-600">
                  confirmPassword
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                    })}
                    className={`mt-1 mb-2 p-2 border rounded-md w-full pr-10 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {/* Eye Icon */}
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 mb-6">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Email field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`mt-1 mb-2 p-2 border rounded-md w-full pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Eye Icon */}
              {showPassword ? (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 mb-6">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {formType === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch between login/signup */}
        {formType === "signup" ? (
          <p className="text-center mt-6">
            Already have Account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
