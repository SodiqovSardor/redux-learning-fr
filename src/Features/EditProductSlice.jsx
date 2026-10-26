import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editProducts = createAsyncThunk(
  "editProduct",
  async (id, products) => {
    const request = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const data = await request.json();
    return data;
  }
);

export const editProductsSlice = createSlice({
  name: "editProductSlice",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(editProducts.rejected, (state, action) => {
        (state.loading = false),
          (state.data = {}),
          (state.error = action.error.message);
      });
  },
});

export default editProductsSlice.reducer;