import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";

const initialState = {
  wishCount: JSON.parse(localStorage.getItem(auth.currentUser?.displayName)) || [],
  userName: {
    name: "",
    isAuth: false,
  },
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishList: (state, action) => {
      const add = {
        wishCount: action.payload,
        isFav: true,
      };
      state.wishCount.push(add);
      localStorage.setItem(
        auth.currentUser?.displayName,
        JSON.stringify(state.wishCount)
      );
    },
    removeFromWishlist: (state, action) => {
      state.wishCount = state.wishCount.filter(
        (item) => item.wishCount.idMeal !== action.payload.idMeal
      );
      localStorage.setItem(
        auth.currentUser?.displayName,
        JSON.stringify(state.wishCount)
      );
    },

    login: (state, action) => {
      state.userName.name = action.payload.name;
      state.userName.isAuth = true;
    },
    logout: (state) => {
      state.userName.isAuth = false;
    },
  },
});

export default wishListSlice.reducer;
export const { addWishList, removeFromWishlist, login, logout } =
  wishListSlice.actions;


