import { createSlice } from "@reduxjs/toolkit";

export const CartsSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    setCarts: (state, action) => {
      state.carts = action.payload;
    },
    addCarts: (state, action) => {
      state.carts.push(action.payload);
    },
    updateCartsById: (state, action) => {
      state.carts = state.carts.map((cart, i) => {
        if (cart.id == action.payload.id) {
          cart = action.payload;
        }
        return cart;
      });
    },
    deleteCartsById: (state, action) => {
      state.carts = state.carts.filter((cart) => {
        return cart.id !== action.payload;
      });
    },
  },
});

export const { setCarts, addCarts, updateCartsById, deleteCartsById } =
  CartsSlice.actions;
export default CartsSlice.reducer;
