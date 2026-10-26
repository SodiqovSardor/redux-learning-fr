import { configureStore } from "@reduxjs/toolkit";
import getProductsReducer from "../Features/GetProductsSlice";
import deleteProductsReducer from "../Features/DeleteProductSlice";
import addProductsReducer from "../Features/AddProductSlice";
import editProductsReducer from "../Features/EditProductSlice";

export const store = configureStore({
  reducer: {
    getproducts: getProductsReducer,
    deleteproducts: deleteProductsReducer,
    addproducts: addProductsReducer,
    editproducts: editProductsReducer,
  },
});
