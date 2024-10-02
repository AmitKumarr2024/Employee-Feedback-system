import React, { useEffect } from "react";
import AuthForm from "../Components/AuthForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSignupUser from "../hook/useSignupUser ";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signupUser, loading, error, success } = useSignupUser(); // Use the custom hook

  // Handle form submission
  const handleSubmit = async (data) => {
    console.log("signup data:", data);

    // Call the signupUser function from the hook
    await signupUser(data);

    // If the signup is successful, show success message and redirect
    if (success) {
      toast.success("Signup successful!"); // Show success toast
      navigate('/login'); // Redirect to the login page
    } else if (error) {
      toast.error(error); // Show error toast if any error occurs
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to the Dashboard if already logged in
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="w-screen h-screen flex justify-center items-center bg-sky-700">
        {/* Pass handleSubmit as the onSubmit handler to AuthForm */}
        <AuthForm formType="signup" onSubmit={handleSubmit} />
        {loading && <p>Signing up...</p>} {/* Show loading state */}
      </div>
    </div>
  );
};

export default SignUpPage;
