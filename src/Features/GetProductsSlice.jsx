import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProduct", async () => {
  const request = await fetch("https://dummyjson.com/products");
  const data = await request.json();
  return data.products;
});

export const getProductsSlice = createSlice({
  name: "getProductsSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        (state.data = []), (state.loading = true), (state.error = null);
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        (state.data = action.payload),
          (state.loading = false),
          (state.error = null);
      })
      .addCase(getProducts.rejected, (state, action) => {
        (state.loading = false), (state.data = []), (state.error = null);
      });
  },
});

export default getProductsSlice.reducer;
