import { createSlice } from "@reduxjs/toolkit";

export const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
    selectedSubCategoryId: null,
    products: [],
    subCategoryId: null,
  },
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSelectedSubCategoryId: (state, action) => {
      state.selectedSubCategoryId = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setSubCategoryId: (state, action) => {
      state.subCategoryId = action.payload;
    },
  },
});

export const { setSubCategoryId, setSubCategories, setSelectedSubCategoryId, setProducts } =
  subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
