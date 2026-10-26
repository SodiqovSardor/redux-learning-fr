import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk("addProduct", async (product) => {
  const request = await fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await request.json();
  return data;
});

export const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        (state.loading = false),
          (state.data = {}),
          (state.error = action.error.message);
      });
  },
});

export default addProductSlice.reducer;
