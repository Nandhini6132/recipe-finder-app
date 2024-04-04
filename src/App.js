import { Route, Routes } from "react-router-dom";
import { logout,login } from "./slices/wishListSlice";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Search from "./components/homeComponents/Search";
import SinglePage from "./pages/SinglePage";
import WishList from "./pages/WishList";
import { auth,db,provider} from "./firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import SingleCategoryPage from "./pages/SingleCategoryPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



function App() {
  const [user, setUser]=useState(null)
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user)
      setUser(user)

      else
      setUser(null)
    })
  },[])
  const handleLogin = async () => {
    try {
     const result = await signInWithPopup(auth, provider);
     const username=result.user.displayName
      
      await dispatch(login({name:username}))
     
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  
  const handleLogOut=()=>{
    console.log('logged out')
    auth.signOut()
    dispatch(logout())
  }
  

  return (
    <div className="App">
     <Header user={user} handleLogOut={handleLogOut}/>
     {/* <Search/> */}
     <Routes>
      <Route path="/recipe-finder-app" element={<Home />}/>
      <Route path="/recipe-finder-app/singlepage/:strCategory" element={<SinglePage handleLogin={handleLogin} user={user} />}/>
      <Route path="/recipe-finder-app/singlepage/:strCategory/:idMeal" element={<SingleCategoryPage/>}/>
      <Route path="/recipe-finder-app/wishlist" element={<WishList user={user}/>}/>
     </Routes>
    </div>
  );
}


export default App;
