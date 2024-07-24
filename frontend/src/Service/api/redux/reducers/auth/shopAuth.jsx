import { createSlice } from "@reduxjs/toolkit";

export const shopAuthSlice = createSlice({
  name: "shopAuth",
  initialState: {
    token: localStorage.getItem("token") || null,
    shopId: localStorage.getItem("shopId") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setShopId: (state, action) => {
      state.shopId = action.payload;
      localStorage.setItem("shopId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.shopId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setShopId, setLogout } = shopAuthSlice.actions;
export default shopAuthSlice.reducer;
