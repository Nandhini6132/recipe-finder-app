import React, { useEffect,useState } from "react";
import { Container } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { login, removeFromWishlist } from "../slices/wishListSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "../firebase/firebase";

const WishList = ({user}) => {
  const wishlistCountSelector = useSelector((state) => state.wishlist.wishCount)
  const dispatch= useDispatch()
  const authName=auth.currentUser?.displayName
  const [loading, setLoading] = useState(true);

  const getnameFromStorage=JSON.parse(localStorage.getItem(authName))|| []
  console.log(getnameFromStorage)
  const removeFromWishList=async(idMeal)=>{
    console.log(idMeal)
    // await deleteDoc(doc(db,user.displayName,idMeal))
    await dispatch(removeFromWishlist({idMeal}))
    console.log('removed')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser.displayName) {
          
          await dispatch(login({ name: auth.currentUser.displayName}));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
   }
  return (
    <Container fluid>
      <div
        className="text-center d-flex flex-column align-items-center justify-content-center"
        style={{ transform: "translate(3px, 0px)", height: "90vh" }}
      >
        <FavoriteBorderIcon sx={{ fontSize: "6rem" }} />
        <Typography variant="h3">My Wishlist</Typography>
        <div className="" style={{ minHeight: "579px", width: "80%" }}>
          {getnameFromStorage.length > 0 ? (
            <>
              <table class="table table-striped  mt-5">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">ID</th>
                    <th scope="col">Meal name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(getnameFromStorage)
                    ? getnameFromStorage.map((item, index) => (
                        <tr key={index}>
                          {" "}
                          <th scope="row">
                            <img
                              src={item?.wishCount?.strMealThumb}
                              alt=""
                              width={100}
                            />
                          </th>
                          <td style={{ verticalAlign: "middle" }}>
                            {item?.wishCount?.idMeal}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {item?.wishCount?.strMeal}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <button className="btn btn-danger" onClick={()=>removeFromWishList(item?.wishCount?.idMeal)}>
                              remove from wishlist
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </>
          ) : (
            <Typography variant="h4" className="mt-5">
              Your wishlist is empty
            </Typography>
          )}
        </div>
      </div>
    </Container>
  );
};

export default WishList;
