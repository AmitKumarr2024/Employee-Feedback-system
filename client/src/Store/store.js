import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";

import feedbackReducer from "../Store/feedbck/getAllFeedbackSlice";
import createFeedback from "../Store/feedbck/feedbackSlice";
import feedbackReceiverReducer from "../Store/feedbck/fetchFeedbackByReceiver";
import notificationReducer from "../Store/notificationSlice ";

const store = configureStore({
  reducer: {
    users: userReducer, // Register your user slice

    createFeedback: createFeedback,
    feedback: feedbackReducer,
    receiverFeedback: feedbackReceiverReducer,
    notification: notificationReducer,
  },
});

export default store;
