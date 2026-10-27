import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProduct", async () => {
  const request = await fetch("https://dummyjson.com/products");
  const data = await request.json();
  return data.products;
});

