// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://employee-feedback-system-554y.onrender.com/api/user/all-user', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch users');
  }

  const data = await response.json();
  console.log("UserSlice",data);
  return data.data; // Assuming the users are in data.data
  
});

// Create a slice for user management
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Example action to clear users (you can add more as needed)
    clearUsers(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Update users state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users'; // Set error state
      });
  },
});

// Export the actions if you define any
export const { clearUsers } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
