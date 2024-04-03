import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foods: {},
  singlefood:[],
  filteredCategory:[],
  singleCategoryFood:[],
  status: 'idle'
};

const baseURL='https://www.themealdb.com/api/json/v1/1/'

export const fetchAsyncFood = createAsyncThunk('foods/get', async () => {
  const response = await axios.get(`${baseURL}/categories.php`);

  console.log(response.data.meals)
  return response.data.categories;
});
  // const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=s');
export const fetchAsyncSingleFood= createAsyncThunk('food/singleProduct', async(strCategory)=>{
  console.log(strCategory)
    const response = await axios.get(`${baseURL}filter.php?c=${strCategory}`);
    console.log(response.data.meals)
    return response.data.meals;
})

export const fetchAsyncSingleCategoryFood= createAsyncThunk('food/singleCategoryFood', async(idMeal)=>{
  console.log(idMeal)
  const response = await axios.get(`${baseURL}lookup.php?i=${idMeal}`)
  console.log(response.data)
  return response.data
})

export const fetchAsyncSearchByName= createAsyncThunk('food/searchByName',async(term)=>{
  console.log(term)
  const response= await axios.get(`${baseURL}search.php?s=${term}`)
  console.log(response.data.meals)
  return response.data.meals
})

export const fetchAsyncSearchByLetter= createAsyncThunk('food/serachByIngredient', async(term)=>{
  const response= await axios.get(`${baseURL}search.php?f=${term}`)
  console.log(response.data)
  return response.data.meals
})
export const fetchAsyncSearchByArea=createAsyncThunk('food/searchByarea',async(term)=>{
  console.log(term)
  const response=await axios.get(`${baseURL}filter.php?a=${term}`)
  console.log(response.data.meals, 'area')
  return response.data.meals
})

export const fetchAsyncFilterByIngredient=createAsyncThunk('food/filteredbycategory',async(term)=>{
  console.log(term)
  const response= await axios.get(`${baseURL}filter.php?i=${term}`)
  console.log(response.data.meals)
  return response.data.meals;
})

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncFood.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchAsyncFood.fulfilled, (state, action) => {
        state.foods = action.payload; 
        state.status = 'idle'; 
      })
      .addCase(fetchAsyncSingleFood.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchAsyncSingleFood.fulfilled,(state,action)=>{
        state.singlefood = action.payload;
        state.status = 'idle';
      })

      .addCase(fetchAsyncFilterByIngredient.fulfilled,(state,action)=>{
        state.singlefood=action.payload;
        state.status='idle'
      })
      .addCase(fetchAsyncSingleCategoryFood.fulfilled,(state,action)=>{
        state.singleCategoryFood=action.payload;
        state.status='idle'
      })
      .addCase(fetchAsyncSearchByName.fulfilled,(state,action)=>{
        state.foods=action.payload;
        state.status='idle'
      })
      .addCase(fetchAsyncSearchByArea.fulfilled,(state,action)=>{
        state.singlefood=action.payload;
        state.status='idle'
      })
      .addCase(fetchAsyncSearchByLetter.fulfilled,(state,action)=>{
        state.singlefood=action.payload;
        state.status='idle'
      })
      
  }
});

export default foodSlice.reducer;
