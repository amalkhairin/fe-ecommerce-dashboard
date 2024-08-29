import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    items: [],
    lastSet: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories(state, action) {
      state.items = action.payload;
      state.lastSet = new Date().toISOString;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setError, setIsLoading, setCategories } =
  productCategoriesSlice.actions;

const { reducer: productCategoriesReducer } = productCategoriesSlice;

export default productCategoriesReducer;