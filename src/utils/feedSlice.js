import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    items: [],
    isLoding: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoding = action.payload;
    },
    addFeed: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeFeed: (state, action) => {
      state.items = [];
    },
  },
});

export const { addFeed, setLoading, setError, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
