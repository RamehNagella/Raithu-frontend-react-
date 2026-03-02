import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";

export const addGrainAsync = createAsyncThunk(
  "/grain/addGrain",
  async (grainData, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL + "/grain/add", grainData, {
        withCredentials: true,
      });
      return res.data?.item;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Somthing Went wrong while fetching grain to add, Try after sometime",
      );
    }
  },
);

const grainSlice = createSlice({
  name: "grain",
  initialState: {
    item: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // addGrain: (state, action) => {
    //   state.item = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    removeGrain: (state, action) => {
      state.item = [];
    },
  },
});

export const { setLoading, setError, removeGrain } = grainSlice.actions;

export default grainSlice.reducer;
