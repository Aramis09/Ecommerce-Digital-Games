import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import mercadoLibreReducer from "../reducer/mercadoLibreReducer";
import shoppingCartReducer from "../reducer/shoppingCartReducer";
import userReducer from "../reducer/userReducer";
import wishReducer from "../reducer/wishReducer";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    mercadoLibreReducer: mercadoLibreReducer,
    shoppingCartReducer: shoppingCartReducer,
    userReducer: userReducer,
    wishReducer: wishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
