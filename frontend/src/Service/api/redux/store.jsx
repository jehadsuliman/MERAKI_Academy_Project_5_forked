import { configureStore } from "@reduxjs/toolkit";
import shopAuth from "./reducers/auth/shopAuth";

export default configureStore({
  reducer: {
    shopAuth: shopAuth,
  },
});