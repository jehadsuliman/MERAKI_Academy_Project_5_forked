import { createSlice } from "@reduxjs/toolkit";

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    // categororyId: localStorage.getItem("categororyId") || null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategories: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategoriesById: (state, action) => {
      state.categories = state.categories.map((category, i) => {
        if (category.id == action.payload.id) {
            category = action.payload;
        }
        return category;
      });
    },
    deleteCategoriesById: (state, action) => {
      state.categories = state.categories.filter((category) => {
        return category.id !== action.payload;
      });
    },
  },
});

export const { setCategories, addCategories, updateCategoriesById, deleteCategoriesById } =
CategoriesSlice.actions;
export default CategoriesSlice.reducer;
