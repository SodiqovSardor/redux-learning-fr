import { getProducts } from "./GetProductsSlice";
import { deleteProducts } from "./DeleteProductSlice";
import { addProducts } from "./AddProductSlice";
import { editProducts } from "./EditProductSlice";
import { createSlice } from "@reduxjs/toolkit";

export const ProductsSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(getProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.error = action.error.message);
      })
      .addCase(deleteProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(addProducts.pending, (state) => {
        (state.loading = true), (state.data = []), (state.error = null);
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        (state.loading = false),
          state.data.unshift(action.payload),
          (state.error = null);
      })
      .addCase(addProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.error = action.error.message);
      })
      .addCase(editProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(editProducts.rejected, (state, action) => {
        (state.loading = false), (state.data = []), (state.error = null);
      });
  },
});

export default ProductsSlice.reducer;
