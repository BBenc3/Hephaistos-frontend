import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import { IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Paper, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown"; // Importáljuk a UserProfileDropdown komponenst
import { Gear } from 'react-bootstrap-icons';

const NavbarButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  fontSize: "16px",
  marginRight: "5px",
  fontWeight: theme.typography.fontWeightBold,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, user } = useAuth(); // Get authentication state and user
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderNavLinks = () => (
    <>
      <NavbarButton onClick={() => navigate("/")}>Főoldal</NavbarButton>
      <NavbarButton onClick={() => navigate("/orarend-generalas")}>Órarend generálás</NavbarButton>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.primary.main, fontSize: "24px", fontWeight: "bold" }}>
          Hephaistos
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer} sx={{ color: theme.palette.primary.main }}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                },
              }}
            >
              <List>
                <ListItem button onClick={() => { navigate("/"); toggleDrawer(); }}>
                  <ListItemText primary="Főoldal" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/orarend-generalas"); toggleDrawer(); }}>
                  <ListItemText primary="Órarend generálás" />
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <div>{renderNavLinks()}</div>
        )}

        {isLoggedIn ? (
            <UserProfileDropdown user={user} /> // Pass user to UserProfileDropdown
        ) : (
          <CustomButton size="small" onClick={() => navigate("/login")}>
            Bejelentkezés
          </CustomButton>
        )}

        <IconButton color="inherit" onClick={handleMenuClick} sx={{ color: theme.palette.primary.main }}>
          <Gear />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { setIsDarkMode(!isDarkMode); handleMenuClose(); }}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
