import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "../slices/foodSlice";
import wishListSlice from "../slices/wishListSlice";


export const store = configureStore({
    reducer:{
        foods:foodSlice,
        wishlist:wishListSlice
    }
})