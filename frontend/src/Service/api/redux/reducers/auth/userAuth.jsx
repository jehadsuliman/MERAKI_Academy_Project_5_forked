import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
      localStorage.setItem("userId", action.payload.userId);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserId, setLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
