import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import grainReducer from "./grainSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    grain: grainReducer,
  },
});

export default appStore;
