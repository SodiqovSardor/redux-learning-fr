import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "../Features/Products/ProductSlices";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
  },
});
