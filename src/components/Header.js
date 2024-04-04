import Container from "react-bootstrap/Container";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { auth } from "../firebase/firebase";

function Header({ user, handleLogOut }) {
  
  const wishCount = useSelector((state) => state.wishlist.wishCount);
  const currentUser= useSelector((state)=>state.wishlist.userName.name)

  const getNameFromStorage=JSON.parse(localStorage.getItem(auth.currentUser?.displayName))
  const wishLength = getNameFromStorage?.length;
 
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <Navbar
      expand="lg"
      
      className="ps-md-5 pe-md-5 ps-0"
      style={{
        position: "sticky",
        top: 0,
        zIndex: "90",
        background: "#e5e0e0",
      }}
    >
      <Container fluid>
        <Navbar.Brand className="me-auto ps-md-5" >
          <Link to={'/'}>Recipe App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="pe-md-5"> 
          <Nav className="ms-auto align-items-center ">
            <Nav.Link to={"/wishlist"}>
              <Link to={"/wishlist"}>
                <Badge badgeContent={wishLength} color="primary">
                  <FavoriteIcon sx={{ color: "green" }} />
                </Badge>
              </Link>
            </Nav.Link>

            {user && (
              <Nav.Link href="#link" className="dropdown">
                <Tooltip title={user.displayName} arrow>
                  <Avatar
                    alt={user.displayName}
                    src={user?.photoURL}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                </Tooltip>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#" onClick={handleLogOut}>
                     Logout
                    </a>
                  </li>
                  
                </ul>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
