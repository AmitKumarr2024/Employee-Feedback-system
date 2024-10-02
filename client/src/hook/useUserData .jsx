import { useState, useEffect } from 'react';
import { decodeToken } from '../helper/decodeToken';



const useUserData = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const token = localStorage.getItem('token'); // Fetch token from localStorage

    // Only proceed if token exists
    if (!token) {
      setError('Token not found in localStorage');
      setLoading(false);
      return;
    }

    // Decode the token to extract the userId
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken._id) {
      setError('Invalid token');
      setLoading(false);
      return;
    }

    const userId = decodedToken._id; // Extract userId from the decoded token

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before the new request

        const response = await fetch(`/api/user/single-user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add token to the Authorization header if required
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong!');
        }

        const result = await response.json();
        console.log("result",result);
        
        setUser(result); // Set user data
      } catch (err) {
        setError(err.message || 'Network error');
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // Effect will only run once on component mount

  return { user, loading, error }; // Return user data, loading, and error states
};

export default useUserData;
