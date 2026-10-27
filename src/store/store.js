import { configureStore } from "@reduxjs/toolkit";
import getProductsReducer from "../Features/GetProductsSlice";

export const store = configureStore({
  reducer: {
    products: getProductsReducer,
  },
});
