import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Gear } from 'react-bootstrap-icons';
import { keyframes } from '@mui/system';
import useUserData from "../hooks/useUserData";
import CustomButton from "./Button";
import UserProfileDropdown from "./UserProfileDropdown";
import CustomDropdown from "./CustomDropdown";
import DarkModeToggle from './DarkModeToggle';

const NavbarButton = styled(Button)(({ theme, active }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  fontSize: "16px",
  marginRight: "5px",
  fontWeight: theme.typography.fontWeightBold,
  borderBottom: active ? `2px solid ${theme.palette.primary.main}` : "none",
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
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUserData();
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
      <NavbarButton onClick={() => navigate("/")} active={location.pathname === "/" ? true : undefined}>
        Főoldal
      </NavbarButton>
      <NavbarButton onClick={() => navigate("/schedule")} active={location.pathname === "/schedule" ? true : undefined}>
        Órarend generálás
      </NavbarButton>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: `${theme.palette.background.default}CC` }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" onClick={() => navigate("/")} sx={{ flexGrow: 1, color: theme.palette.primary.main, fontSize: "24px", fontWeight: "bold", cursor: "pointer", userSelect: "none" }}>
          Hephaistos
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer} sx={{ color: theme.palette.primary.main }}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} PaperProps={{ sx: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary } }}>
              <List>
                <ListItem button onClick={() => { navigate("/"); toggleDrawer(); }}>
                  <ListItemText primary="Főoldal" />
                </ListItem>
                <ListItem button onClick={() => { navigate("/schedule"); toggleDrawer(); }}>
                  <ListItemText primary="Órarend generálás" />
                </ListItem>
                {!user && (
                  <ListItem button onClick={() => { navigate("/login"); toggleDrawer(); }}>
                    <ListItemText primary="Bejelentkezés" />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <div>{renderNavLinks()}</div>
        )}

        {user ? (
          <UserProfileDropdown anchorEl={profileAnchorEl} onMenuClick={handleProfileMenuClick} onMenuClose={handleProfileMenuClose} user={user} />
        ) : (
          !isMobile && (
            <CustomButton size="small" onClick={() => navigate("/login")}>
              Bejelentkezés
            </CustomButton>
          )
        )}

        <IconButton color="inherit" onClick={handleGearMenuClick} sx={{ color: theme.palette.primary.main }}>
          <AnimatedGear />
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
