import { configureStore } from "@reduxjs/toolkit";
import shopAuth from "./reducers/auth/shopAuth";
import shop from "./reducers/shopSlices/shopSlices";

export default configureStore({
  reducer: {
    shopAuth: shopAuth,
    shop: shop,
  },
});
