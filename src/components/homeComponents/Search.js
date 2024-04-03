import React,{useState} from 'react'
import '../homeComponents/Search.css'
import {Form,InputGroup} from 'react-bootstrap'
import Header from '../Header'
import { Button } from 'bootstrap'
import {useDispatch} from 'react-redux'
import { fetchAsyncFilterByCategory, fetchAsyncFood, fetchAsyncSearchByArea, fetchAsyncSearchByName } from '../../slices/foodSlice'
import SearchIcon from '@mui/icons-material/Search';


const Search = () => {
  const [term,setTerm]=useState()
  const dispatch=useDispatch()

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim() === '') {
      dispatch(fetchAsyncFood());
    } else {
      dispatch(fetchAsyncSearchByName(term));
     
    }
  };
  
  return (
    <>
     <div className="bg-img">
    
     <Form className='form d-flex flex-column' onSubmit={handleSearch}>
          <InputGroup className='InputGroup'>
            <Form.Control className='form-control' value={term} onChange={(e) => setTerm(e.target.value)} type='text' placeholder='Search by category, Area' />
            <button type="submit" className='btn btn-success'><SearchIcon /></button>
          </InputGroup>
            <h3 className='text-warning mt-4'>Search  Your Favourite food</h3>
        </Form>
     </div>
    </>
  )
}

export default Search