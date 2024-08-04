import { configureStore } from "@reduxjs/toolkit";

import shopAuthReducer from "./reducers/auth/shopAuth";
import userAuthReducer from "./reducers/auth/userAuth";
import usersReducer from "./reducers/user/user";
import shopsReducer from "./reducers/shop/shop";
import categoriesReducer from "./reducers/categories/categories";
import subCategoriesReducer from "./reducers/shop/subCategoriesSlice";
import productsReducer from "./reducers/shop/product";
import cartsReducer from "./reducers/user/carts";

export default configureStore({
  reducer: {
    shopAuth: shopAuthReducer,
    userAuth: userAuthReducer,
    users: usersReducer,
    shops: shopsReducer,
    products: productsReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    carts: cartsReducer,
  },
});
