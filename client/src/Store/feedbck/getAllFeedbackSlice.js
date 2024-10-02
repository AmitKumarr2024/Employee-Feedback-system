import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const FEEDBACK_API_URL = "/api/feedback/feedbackAll";

// Async thunk to fetch all feedback
 const fetchAllFeedback = createAsyncThunk(
  "feedback/fetchAllFeedback",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const data = await response.json();
      console.log("Fetched Feedback Data:", data); // Log the fetched data
      return data; // Return the feedback data from the API
    } catch (error) {
      console.error("Fetch error:", error); // Log any error encountered
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for feedback
const initialState = {
  feedbackList: [],
  loading: false,
  error: null,
};

// Feedback slice
const getAllFeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // Optional: You can add reducers if needed for manual state updates
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeedback.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackList = action.payload; // Update the state with the fetched feedback
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch feedback"; // Set the error state
      });
  },
});

// Export the async thunk for use in components
export { fetchAllFeedback };

// Export the reducer to be included in the store
export default getAllFeedbackSlice.reducer;
