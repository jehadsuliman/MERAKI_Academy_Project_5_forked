import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
    name: 'shop',
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
      updateShop: (state, action) => {
        const index = state.shops.findIndex(shop => shop.id === action.payload.id);
        if (index !== -1) {
          state.shops[index] = action.payload;
        }
      },
      deleteShop: (state, action) => {
        state.shops = state.shops.filter(shop => shop.id !== action.payload);
      },
    },
  });
  
  export const { setShops, addShop, updateShop, deleteShop } = shopSlice.actions;
  export default shopSlice.reducer;