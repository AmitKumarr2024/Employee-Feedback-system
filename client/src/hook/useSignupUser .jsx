import { useState } from "react";

const useSignupUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that we're sending JSON
        },
        body: JSON.stringify(userData), // Convert the user data to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to sign up user");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, loading, error, success };
};

export default useSignupUser;
