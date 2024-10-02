import React, { useEffect, useState } from "react";
import AuthForm from "../Components/AuthForm";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response is not okay (not in the 200 range)
      if (!response.ok) {
        // Get the error message from the response
        const result = await response.json();
        toast.error(result.message); // Display the server message
        throw new Error(result.message); // Throw the error to handle in the catch block
      }

      const result = await response.json();
      localStorage.setItem("token", result.data); // Assuming result.data contains the token
      console.log("User logged in successfully:", result);
      navigate('/')
      toast.success(result.message);

      // You can redirect or show a success message here
    } catch (err) {
      setError(err.message);
      toast.error(err.message); // Display the error message
    } finally {
      setLoading(false);
    }
  };

    // Check if the user is already logged in
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/"); // Redirect to the Dashboard if already logged in
      }
    }, [navigate]);

  return (
    <div className="container ">
      <Toaster />
      <div className="w-screen h-screen flex justify-center items-center bg-sky-700">
        <AuthForm formType="Login" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
