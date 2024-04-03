import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Container } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncFood } from "../slices/foodSlice";
import { Link } from "react-router-dom";
import Search from "../components/homeComponents/Search";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addWishList, removeFromWishlist } from "../slices/wishListSlice";
import Categories from "../components/homeComponents/Categories";
import { auth,db,provider} from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";


const Home = ({user}) => {
 
  // const [valueMap, setValueMap] = useState({});
  // const [isFav, setIsFav] = useState(true);

  // const dispatch = useDispatch();
  // const foodListItem = useSelector((state) => state.foods.foods);
  // const status = useSelector((state) => state.foods.status);
  // const wishlist = useSelector((state) => state.wishlist.wishCount);
  // if (wishlist.length > 0) {
  //   console.log(wishlist[0].isFav);
  // }

  // useEffect(() => {
  //   dispatch(fetchAsyncFood());
  // }, []);

  // if (!Array.isArray(foodListItem)) {
  //   console.error("foodListItem is not an array:", foodListItem);
  //   return <p>Error fetching data</p>;
  // }

  // const handleChange = (idCategory, idMeal, newValue, food) => {
  //   setValueMap((prevValueMap) => ({
  //     ...prevValueMap,
  //     [idMeal]: newValue === prevValueMap[idMeal] ? 0 : newValue,
  //   }));
  
  //   const isInWishlist = wishlist?.some(
  //     (item) => item.idCategory === idCategory || item.idMeal === idMeal
  //   );
  
  //   if (isInWishlist) {
  //     dispatch(removeFromWishlist({ idCategory, idMeal }));
  //   } else {
  //     dispatch(addWishList({ idCategory, idMeal, ...food }));
  //   }
  // };
  
  return (
    <>
      <Search />
      <Categories />
    </>
  );
};

export default Home;
