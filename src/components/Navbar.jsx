import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Gear } from 'react-bootstrap-icons';
import { keyframes } from '@mui/system';

import CustomButton from "./Button";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuth } from "../contexts/AuthContext";
import CustomDropdown from "./CustomDropdown";
import DarkModeToggle from './DarkModeToggle';

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

const rotateForward = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
`;

const rotateBackward = keyframes`
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const AnimatedGear = styled(Gear)(({ theme, animateForward, animateBackward }) => ({
  animation: animateForward ? `${rotateForward} 0.5s linear` : animateBackward ? `${rotateBackward} 0.5s linear` : 'none',
  transform: animateForward ? 'rotate(45deg)' : animateBackward ? 'rotate(0deg)' : 'none',
}));

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const [gearAnchorEl, setGearAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [animateForward, setAnimateForward] = useState(false);
  const [animateBackward, setAnimateBackward] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleGearMenuClick = (event) => {
    setGearAnchorEl(event.currentTarget);
    setAnimateForward(true);
    setAnimateBackward(false);
  };

  const handleGearMenuClose = () => {
    setGearAnchorEl(null);
    setAnimateForward(false);
    setAnimateBackward(true);
  };

  const handleProfileMenuClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const renderNavLinks = () => (
    <>
      <NavbarButton onClick={() => navigate("/")}>Főoldal</NavbarButton>
      <NavbarButton onClick={() => navigate("/schedule")}>Órarend generálás</NavbarButton>
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

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem button onClick={() => { navigate("/"); toggleDrawer(); }}>
                  <ListItemText primary="Főoldal" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/schedule"); toggleDrawer(); }}>
                  <ListItemText primary="Órarend generálás" />
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <div>{renderNavLinks()}</div>
        )}

        {isLoggedIn ? (
          <UserProfileDropdown anchorEl={profileAnchorEl} onMenuClick={handleProfileMenuClick} onMenuClose={handleProfileMenuClose} user={user} />
        ) : (
          <CustomButton size="small" onClick={() => navigate("/login")}>
            Bejelentkezés
          </CustomButton>
        )}

        <IconButton color="inherit" onClick={handleGearMenuClick} sx={{ color: theme.palette.primary.main }}>
          <AnimatedGear animateForward={animateForward} animateBackward={animateBackward} />
        </IconButton>
        <CustomDropdown anchorEl={gearAnchorEl} open={Boolean(gearAnchorEl)} onClose={handleGearMenuClose}>
          <MenuItem>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </MenuItem>
        </CustomDropdown>
      </Toolbar>
    </AppBar>
  );
}
