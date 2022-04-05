import { createSlice } from '@reduxjs/toolkit'
import { asyncThunk } from '../../helpers/asyncThunk';

export const postRestoraunt = asyncThunk("restoraunt/post", "post", "/restoraunts");
export const fetchCategories = asyncThunk(
  "categories/fetch",
  "get",
  "/categories?fields=name"
);

export const getRestoraunts = asyncThunk(
  "restoraunts/get",
  "get",
  "/restoraunts"
);

const restorauntSlice = createSlice({
  name: "restoraunt",
  initialState: {
    data: [],
    loading: "",
    categories: [],
  },
  extraReducers: {
    [postRestoraunt.pending]: (state) => {
      state.loading = "loading";
    },
    [postRestoraunt.fulfilled]: (state) => {
      state.loading = "complete";
    },
    [postRestoraunt.rejected]: (state) => {
      state.loading = "error";
    },

    [fetchCategories.pending]: (state) => {
      state.loading = "loading";
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = "complete";
      state.categories = action.payload.data;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = "error";
    },

    [getRestoraunts.pending]: (state) => {
      state.loading = "loading";
    },
    [getRestoraunts.fulfilled]: (state, action) => {
      state.loading = "complete";
      state.data = action.payload.data;
    },
    [getRestoraunts.rejected]: (state) => {
      state.loading = "error";
    },
  },
});

export default restorauntSlice.reducer;
