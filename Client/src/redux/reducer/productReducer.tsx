import { createSlice } from "@reduxjs/toolkit";
import { productReducerState } from "../interfaces/productInterface";

const initialState: productReducerState = {
  porductSearchName: "",
};

export const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setPorductSearchName: (state, action) => {
      state.porductSearchName = action.payload;
    },
  },
});

export const { setPorductSearchName } = productReducer.actions;

export default productReducer.reducer;
