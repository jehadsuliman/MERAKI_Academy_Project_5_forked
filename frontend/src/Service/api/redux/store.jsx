import { configureStore } from "@reduxjs/toolkit";

import shopAuthReducer from "./reducers/auth/shopAuth";
import userAuthReducer from "./reducers/auth/userAuth";
import usersReducer from "./reducers/user/user";
import shopsReducer from "./reducers/shop/shop";
import categoriesReducer from "./reducers/categories/categories";

export default configureStore({
  reducer: {
    shopAuth: shopAuthReducer,
    userAuth: userAuthReducer,
    users: usersReducer,
    shops: shopsReducer,
    categories: categoriesReducer,
  },
});
