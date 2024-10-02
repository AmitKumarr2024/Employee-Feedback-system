import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching feedback by receiver
export const fetchFeedbackByReceiver = createAsyncThunk(
  'feedback/fetchByReceiver',
  async (receiverId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/feedback/receiver/${receiverId}`);
      console.log("feedback reciever",response.data);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbackList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackByReceiver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackByReceiver.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackList = action.payload;
      })
      .addCase(fetchFeedbackByReceiver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
