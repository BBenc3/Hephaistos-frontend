import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Gear } from 'react-bootstrap-icons';

import CustomButton from "./Button";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuth } from "../contexts/AuthContext";
import CustomDropdown from "./CustomDropdown";

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

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar position="static" sx={{ backgroundColor: `${theme.palette.background.default}CC` }}>
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
          <UserProfileDropdown user={user} />
        ) : (
          <CustomButton size="small" onClick={() => navigate("/login")}>
            Bejelentkezés
          </CustomButton>
        )}

        <IconButton color="inherit" onClick={handleMenuClick} sx={{ color: theme.palette.primary.main }}>
          <Gear />
        </IconButton>
        <CustomDropdown anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { setIsDarkMode(!isDarkMode); handleMenuClose(); }}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </MenuItem>
        </CustomDropdown>
      </Toolbar>
    </AppBar>
  );
}
