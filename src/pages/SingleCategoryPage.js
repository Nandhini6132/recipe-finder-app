import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncSingleCategoryFood } from "../slices/foodSlice";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "@mui/material/Card";
import ListItemIcon from "@mui/material/ListItemIcon";
import CardMedia from "@mui/material/CardMedia";
import CircleIcon from "@mui/icons-material/Circle";

import { Box, CardActionArea, List, Typography } from "@mui/material";
import Home from "./Home";
import Categories from "../components/homeComponents/Categories";

const SingleCategoryPage = () => {
  const { idMeal } = useParams();
  console.log(idMeal);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.foods.singleCategoryFood);
  const meal =
    selector.meals && selector.meals.length > 0 ? selector.meals[0] : null;
  console.log(meal);

  useEffect(() => {
    dispatch(fetchAsyncSingleCategoryFood(idMeal));
  }, []);
  return (
    <Container fluid className="">
      {meal ? (
        <div className="ms-5 me-5 mt-5">
          <h5>{meal.strMeal}</h5>
          <div className=" d-flex flex-lg-row flex-column mt-3">
            <Card sx={{ flex:'0 0 35%',backgroundColor:'#e5e0e0;'}}>
          
                <CardMedia
                  component="img"
                  height="100%"
                  width={'100%'}
                  image={meal.strMealThumb}
                  className="img-thumbnail"
                  alt="green iguana"
                />
              
            </Card>
            <Box sx={{pl:5,pr:5,background:'#e5e0e0',position:'relative'}}>
              <List>
                <h5>Ingredients</h5>
                <ul
                  className="d-flex flex-wrap mt-lg-4 mt-3 col-gap-5"
                  style={{columnGap:'30px'}}
                >
                  {Object.keys(meal).map((key) => {
                    if (key.includes("strIngredient") && meal[key]) {
                      return (
                        <div
                          key={key}
                          style={{ border: "none", display: "flex" }}
                        >
                       
                          <li>{meal[key]}</li>
                        </div>
                      );
                    }
                    return null;
                  })}
                </ul>
              </List>
              <Typography className="mt-lg-5 mt-3" >{meal.strInstructions}</Typography>
             <div className="d-flex mt-5 mb-5 gap-4" >
            
            <div> <b>Category:</b> {meal.strCategory}</div>
              <div><b>Area:</b> {meal.strArea}</div>
              <div><b>Tags:</b> {meal.strTags}</div>
           
           
             </div>
            </Box>
          </div>
                  <div className="mt-5">
                    <h4 className="text-center">You May also like</h4>
                  <Categories/>
                  </div>
    
         
        </div>
      ) : (
        "No data"
      )}
    </Container>
  );
};

export default SingleCategoryPage;
