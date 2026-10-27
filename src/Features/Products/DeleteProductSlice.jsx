import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProducts = createAsyncThunk("deleteProducts", async (id) => {
  const request = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  const response = await request.json();
  return response;
});
