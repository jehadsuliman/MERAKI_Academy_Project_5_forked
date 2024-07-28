import { createSlice } from "@reduxjs/toolkit";

export const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategoryId: null,
  },
  reducers: {
    setSubCategoryId: (state, action) => {
      state.subCategoryId = action.payload;
    },
  },
});

export const { setSubCategoryId } = subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;