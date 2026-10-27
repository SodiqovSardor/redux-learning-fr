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
      // EDITED: now actually removes the deleted product from the list
      // (action.meta.arg is the id you passed to dispatch(deleteProducts(id)))
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter((p) => p.id !== action.meta.arg); // ADDED
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })

      .addCase(addProducts.pending, (state) => {
        // EDITED: removed `state.data = []` so the list doesn't blank while adding
        (state.loading = true), (state.error = null);
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
      // EDITED: this is the main fix, it now updates the product in the list
      .addCase(editProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // ADDED: find the edited product and merge the new data into it
        const index = state.data.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      })
      // EDITED: no longer wipes data on failure, and now saves the error message
      .addCase(editProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ProductsSlice.reducer;
