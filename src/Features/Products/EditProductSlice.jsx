import { createAsyncThunk } from "@reduxjs/toolkit";

// UNCHANGED logic: PATCH returns the updated product (with its id),
// which the reducer now uses to update the list
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
  }
);
