import { useState } from "react";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Retrieve the token from local storage or wherever you store it
    const token = localStorage.getItem("token"); // Adjust as necessary

    try {
      const response = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type if needed
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error, success };
};

export default useDeleteUser;
