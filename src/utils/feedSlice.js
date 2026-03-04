import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./constants";

// create Async Thunk

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL + "/grain/grains", {
        withCredentials: true,
      });
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Somthing went wrong while fetching grains, Try after some time",
      );
    }
  },
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    items: [],
    isLoding: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
    updateFeedQuantity: (state, action) => {
      const { grainId, quantity } = action.payload;
      const grain = state.items.find(
        (g) => g._id.toString() === grainId.toString(),
      );
      if (grain) {
        grain.availableQuantity -= quantity;
      }
    },
  },
});

export const { addFeed, setLoading, setError, removeFeed, updateFeedQuantity } =
  feedSlice.actions;

export default feedSlice.reducer;
