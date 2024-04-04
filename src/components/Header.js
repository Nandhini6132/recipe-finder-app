import Container from "react-bootstrap/Container";
import React, { useState } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

function Header({ user, handleLogOut }) {
  const [drawer, setDrawer] = useState(false);

  const toogleOpen = () => {
    setDrawer(true);
  };
  const toogleClose = () => {
    setDrawer(false);
  };

  const wishCount = useSelector((state) => state.wishlist.wishCount);
  const currentUser = useSelector((state) => state.wishlist.userName.name);

  const getNameFromStorage = JSON.parse(
    localStorage.getItem(auth.currentUser?.displayName)
  );
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
        <Navbar.Brand className="me-auto ps-md-5">
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            Recipe App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="pe-md-5">
          <Nav className="ms-auto align-items-center ">
            <Nav.Link to={"/wishlist"}>
              <Tooltip title="wishlist" arrow>
                <Link to={"/wishlist"}>
                  <Badge badgeContent={wishLength} color="primary">
                    <FavoriteIcon sx={{ color: "green" }} />
                  </Badge>
                </Link>
              </Tooltip>
            </Nav.Link>

            {user && (
              <Nav.Link href="#link" className="dropdown">
                <Tooltip title={user.displayName} arrow>
                  <Avatar
                    alt={user.displayName}
                    src={user?.photoURL}
                    type="button"
                    onClick={toogleOpen}
                    // data-bs-toggle="dropdown"
                    // aria-expanded="false"
                  />
                </Tooltip>
                <Drawer
                  open={drawer}
                  onClose={toogleClose}
                  anchor="right"
                  PaperProps={{ sx: { background: "#E5E0E0" } }}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toogleClose}
                  >
                    <List>
                      <ListItem disablePadding className="d-flex flex-column">
                        <ListItemButton>
                          <Avatar
                            src={user?.photoURL}
                            alt={user?.displayName}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </ListItemButton>

                        <Stack gap={3}>
                          <Stack>
                            <Typography variant="h4">Welcome</Typography>
                            <ListItemText
                              primary={user?.displayName}
                              primaryTypographyProps={{ fontSize: "25px" }}
                            />
                          </Stack>
                          <Divider />
                          <Stack gap={8}>
                            <Stack gap={3}>
                              <Link to={"/"} className="d-flex">
                                <DashboardIcon sx={{ color: "grey" }} />
                                <Typography
                                  sx={{
                                    textDecoration: "underline",
                                    color: "black",
                                    ml: 2,
                                  }}
                                >
                                  All Categories
                                </Typography>
                              </Link>
                              <Tooltip title="wishlist" arrow>
                                <Link to={"/wishlist"} className="d-flex">
                                  <Badge color="primary">
                                    <FavoriteIcon sx={{ color: "grey" }} />
                                  </Badge>{" "}
                                  <Typography
                                    sx={{
                                      textDecoration: "underline",
                                      color: "black",
                                      ml: 2,
                                    }}
                                  >
                                    My Wishlist
                                  </Typography>
                                </Link>
                              </Tooltip>
                            </Stack>

                            <Divider/>
                            <a class="d-flex" href="#" onClick={handleLogOut}>
                              <LogoutIcon sx={{ mr: 2, color: "grey" }} />{" "}
                              <Typography
                                sx={{
                                  textDecoration: "underline",
                                  color: "black",
                                }}
                              >
                                Logout
                              </Typography>
                            </a>
                          </Stack>
                        </Stack>
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
