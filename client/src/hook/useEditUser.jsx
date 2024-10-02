import { useState } from "react";

const useEditUser = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const editUser = async (id, userData) => {
    try {
      setLoading(true);
      setError(null); // Reset error before the new request
      setSuccess(false); // Reset success state

      const response = await fetch(
        `/api/user/user-update/${id}`,
        {
          method: "POST", // Change to POST method
          credentials: "include", // Include credentials with the request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData ), // Send user data as JSON
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      setSuccess(true); // Set success state if update is successful
      console.log("edit-User",response);
      
      return await response.json(); // Return the updated user data
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  return { editUser, loading, error, success }; // Return the edit function and states
};

export default useEditUser;
