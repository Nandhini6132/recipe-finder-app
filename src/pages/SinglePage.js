import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncSearchByArea,
  fetchAsyncFilterByIngredient,
  fetchAsyncSearchByLetter,
  fetchAsyncSingleFood,
} from "../slices/foodSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, CardActionArea, List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, InputGroup } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addWishList,
  login,
  removeFromWishlist,
} from "../slices/wishListSlice";
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { type } from "@testing-library/user-event/dist/type";

const SinglePage = ({ handleLogin, user }) => {
  const { strCategory } = useParams();
  console.log(strCategory);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.foods.singlefood);
  const [noData, setNoData] = useState(false);
  console.log(noData, "t/f");
  const [term, setTerm] = useState();
  const [valueMap, setValueMap] = useState({});
  console.log(valueMap,'vmap')
  const [isFav, setIsFav] = useState(false);
  const wishlistState = useSelector((state) => state.wishlist.wishCount);
  const wishlist =
    JSON.parse(localStorage.getItem(auth.currentUser?.displayName)) || [];

  useEffect(() => {
    if (term) {
      dispatch(fetchAsyncSearchByLetter(term));
      dispatch(fetchAsyncSearchByArea(term));
      dispatch(fetchAsyncFilterByIngredient(term));
    } else {
      dispatch(fetchAsyncSingleFood(strCategory));
    }
  }, [term, strCategory]);

  useEffect(() => {
    if (selector === null) {
      setNoData(true);
    } else {
      setNoData(false);
    }
  }, [selector, wishlist]);

  const handleChange = async (idMeal, newValue, a, id) => {
    console.log(idMeal,'idMeal');
    console.log(newValue,'newvalue');
    console.log(a,'a');
    console.log(id,'id');
    try {
      if (user) {
        setValueMap((prevValueMap) => ({
          ...prevValueMap,
          [idMeal]: newValue === prevValueMap[idMeal] ? 0 : newValue,
        }));
  

        const isInWishlist = wishlist.some((item) => item.wishCount.idMeal === idMeal);

        if (newValue === 1) {
          if (!isInWishlist) {
            await dispatch(addWishList({ idMeal, ...a }));
            setIsFav(true)
            await addDoc(collection(db, "user"), { idMeal, ...a });
          } else {
            console.log("Item already in wishlist.");
          }
        } else {
          await dispatch(removeFromWishlist({ idMeal }));
          setIsFav(false)

          const mealDocRef = doc(db, "user", idMeal);
          const mealDocSnapshot = await getDoc(mealDocRef);
          if (mealDocSnapshot.exists()) {
            await deleteDoc(mealDocRef);
            console.log(`Document with ID ${idMeal} deleted from Firestore.`);
          } else {
            console.log(
              `Document with ID ${idMeal} does not exist in Firestore.`
            );
          }
        }
      } else {
        alert("Please login to add items in wishlist.");
        await handleLogin();
      }
    } catch (error) {
      console.log("Error during handleChange:", error);
    }
  };

  return (
    <Container fluid>
      <div
        className=" pt-3 mb-3 ms-sm-5 me-sm-5 ps-sm-5 pe-md-5 d-flex justify-content-between flex-wrap"
        // style={{ margin: "0 8rem" }}
      >
        <h5>{strCategory}</h5>
        <Form className="form">
          <InputGroup className="InputGroup" style={{ width: "18rem" }}>
            <Form.Control
              className="form-control"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search by letter,Category,Area"
            />
            <button className="btn btn-success">
              {" "}
              <SearchIcon />
            </button>
          </InputGroup>
        </Form>
      </div>
      {noData ? (
        <h4>No data found for your searcg results</h4>
      ) : (
        <div className="d-flex flex-wrap gap-5 justify-content-center">
          {selector?.map((a, i) => (
            <div>
              <Card
                sx={{
                  width: "18rem",
                  height: "25rem",
                  backgroundColor: "#e5e0e0;",
                }}
              >
                <CardActionArea>
                  <Link to={`/recipe-finder-app/singlepage/${strCategory}/${a.idMeal}`}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={a.strMealThumb}
                      alt="green iguana"
                    />
                  </Link>

                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {a.strMeal}
                    </Typography>

                    <Rating
                      name={`customized-color`}
                      value={valueMap[a.idMeal] || 0}
                      onChange={(event, newValue) =>
                        handleChange(a.idMeal, newValue, a, i)
                      }
                      max={1}
                      icon={
                        <FavoriteIcon
                          fontSize="inherit"
                          sx={{
                            color: wishlist.some(
                              (item) =>
                                item.wishCount.idMeal === a.idMeal && item.isFav
                            ) 
                              ? "green"
                              : "",
                          }}
                        />
                      }
                      emptyIcon={
                        <FavoriteBorderIcon
                          fontSize="inherit"
                          sx={{
                            color: wishlist.some(
                              (item) =>
                                item.wishCount.idMeal === a.idMeal && item.isFav
                            )
                              ? "green"
                              : "",
                          }}
                        />
                      }
                    />
                  </CardContent>
                </CardActionArea>
              </Card>

              <Box>
                <List>
                  <ListItem>{a.strIngredient1}</ListItem>
                </List>
              </Box>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default SinglePage;
