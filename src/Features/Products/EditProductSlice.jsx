import { createAsyncThunk } from "@reduxjs/toolkit";

export const editProducts = createAsyncThunk(
  "editProducts",
  async ({ id, editedproduct }) => {
    const request = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedproduct),
    });
    const response = await request.json();
    return response;
  },
);
