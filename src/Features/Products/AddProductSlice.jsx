import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProducts = createAsyncThunk(
  "addProducts",
  async (newproduct) => {
    const request = await fetch(`https://dummyjson.com/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    });
    const response = await request.json();
    return response;
  }
);
