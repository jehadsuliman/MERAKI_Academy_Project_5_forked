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
      state.shops = state.shops.map((shop, i) => {
        if (shop.id == action.payload.id) {
          shop = action.payload;
        }
        return shop;
      });
    },
    deleteShopById: (state, action) => {
      state.shops = state.shops.filter((shop) => {
        return shop.id !== action.payload;
      });
    },
  },
});

export const { setShops, addShop, updateShopById, deleteShopById } =
  shopsSlice.actions;
export default shopsSlice.reducer;
