import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    setCart: (state, action) => {
      return action.payload;
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
