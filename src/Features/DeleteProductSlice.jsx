import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteProducts = createAsyncThunk("deleteProducts", async (id) => {
  const request = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  const response = request.json();
  return response;
});

export const deleteProductsSlice = createSlice({
  name: "deleteProductsSlice",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export default deleteProductsSlice.reducer;
