import { useState, useEffect } from 'react';

// Custom hook to fetch all users with refetch support
const useAllUsers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before the new request

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      const response = await fetch('/api/user/all-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const result = await response.json();
      setUsers(result.data); // Set the users data
      console.log("AllUser", result.data);

    } catch (err) {
      // Handle token expiration (optional logic)
      if (err.message === 'Token expired' || err.message === 'Unauthorized') {
        // Optionally trigger a logout or token refresh flow
      }
      setError(err.message || 'Network error');
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Run only once when the component mounts

  return { users, loading, error, refetch: fetchUsers }; // Expose refetch function along with users, loading, and error
};

export default useAllUsers;
