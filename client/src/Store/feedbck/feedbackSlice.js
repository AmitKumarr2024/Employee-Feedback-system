// src/Store/feedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const FEEDBACK_API_URL = "https://employee-feedback-system-554y.onrender.com/api/feedback/createFeedback";

// Async thunk to handle feedback creation
export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Failed to create feedback");
      }

      const data = await response.json();
      console.log("feedback",data);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for feedback
const initialState = {
  feedback: null,
  loading: false,
  error: null,
  success: false,
};

// Feedback slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // Action to reset the feedback form
    resetFeedbackState: (state) => {
      state.feedback = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    // Action to clear the error manually
    clearError: (state) => {
      state.error = null;
    },
    // Action to update feedback (e.g., in a form before submitting)
    updateFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setFeedbackList(state, action) {
      state.feedbackList = action.payload;
    },
    addFeedback(state, action) {
      state.feedbackList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
        state.success = true;
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

export const { resetFeedbackState, clearError, updateFeedback } =
  feedbackSlice.actions;

export default feedbackSlice.reducer;
