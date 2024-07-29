import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productId: null,
    products: [],
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
      localStorage.setItem("productId", action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProductById: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    deleteProductById: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const {
  setProductId,
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
} = productSlice.actions;
export default productSlice.reducer;
