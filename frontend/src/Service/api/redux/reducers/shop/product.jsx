import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productId: null,
  },
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductById: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProductById: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
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
