import { createSlice } from "@reduxjs/toolkit";

export const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    shops: [],
  },
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    addShop: (state, action) => {
      state.shops.push(action.payload);
    },
    updateShopById: (state, action) => {
      state.shops = state.shops.map((shop) =>
        shop.id === action.payload.id ? action.payload : shop
      );
    },
    deleteShopById: (state, action) => {
      state.shops = state.shops.filter(
        (shop) => shop.id !== action.payload
      );
    },
    
  },
});

export const { setShops, addShop, updateShopById, deleteShopById } =
  shopsSlice.actions;
export default shopsSlice.reducer;