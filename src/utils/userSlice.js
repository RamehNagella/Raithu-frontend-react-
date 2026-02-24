import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.error = null;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, removeUser, setUserError } = userSlice.actions;

export default userSlice.reducer;
