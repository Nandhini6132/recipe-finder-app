import React,{useEffect, useState} from 'react'
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addWishList, login, removeFromWishlist } from "../../slices/wishListSlice"
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Container } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncFood } from "../../slices/foodSlice";
import { auth } from '../../firebase/firebase';

const Categories = ({handleLogin}) => {
    const [valueMap, setValueMap] = useState({});
    const [isFav, setIsFav] = useState(true);
  
    const dispatch = useDispatch();
    const foodListItem = useSelector((state) => state.foods.foods);
    const status = useSelector((state) => state.foods.status);
    const wishlist = useSelector((state) => state.wishlist.wishCount);
    if (wishlist.length > 0) {
      console.log(wishlist[0].isFav);
    }
  
    useEffect(() => {
      dispatch(fetchAsyncFood());
      if(auth.currentUser?.displayName){
        dispatch(login({name:auth.currentUser?.displayName}))
      }
    }, []);

    
  
    if (!Array.isArray(foodListItem)) {
      console.error("foodListItem is not an array:", foodListItem);
      return <p>Error fetching data</p>;
    }
  return (
    <Container fluid className="">
    {/* <h3>Categories</h3> */}
    <div className="m-5 d-flex flex-wrap gap-5 justify-content-center">
      {foodListItem.map((food, index) => (
        <Card key={index} sx={{ width: "270px",backgroundColor:'#e5e0e0;' }}>
          <CardActionArea>
            <Link
              to={`/singlepage/${food.strCategory}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={food.strCategoryThumb?food.strCategoryThumb:food.strMealThumb}
                alt="green iguana"
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {food.strCategory?food.strCategory:food.strMeal}
                {/* {food.strMeal} */}
              </Typography>
             
            </CardContent>

            {/* <Rating
              name={`customized-color-${food.idCategory}`}
              value={valueMap[food.idCategory] || 0}
              onChange={(event, newValue) =>
                handleChange(food.idCategory, newValue, food)
              }
              max={1}
              icon={
                <FavoriteIcon
                  fontSize="inherit"
                  sx={{
                    color: wishlist.some(
                      (item) =>
                        item.wishCount.idCategory === food.idCategory &&
                        item.isFav
                    )
                      ? "red"
                      : "grey",
                  }}
                />
              }
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" sx={{
                color: wishlist.some(
                  (item) =>
                    item.wishCount.idCategory === food.idCategory &&
                    item.isFav
                )
                  ? "red"
                  : "grey",
              }}/>}
            /> */}
          </CardActionArea>
        </Card>
      ))}
    </div>
  </Container>
  )
}

export default Categories