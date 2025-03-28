import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, MenuItem, Menu, Select, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Gear } from 'react-bootstrap-icons';
import { keyframes } from '@mui/system';
import useUserData from "../hooks/useUserData";
import CustomButton from "./Button";
import UserProfileDropdown from "./UserProfileDropdown";
import CustomDropdown from "./CustomDropdown";
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext

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

const AnimatedGear = styled(Gear)(({ animateForward, animateBackward }) => ({
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
  const [language, setLanguage] = useState('hu'); // Default language is Hungarian
  const { currentUser } = useAuth(); // Get the current user from AuthContext

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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // Add logic to change the language of the application
  };

  const renderNavLinks = () => (
    <>
      <NavbarButton onClick={() => navigate("/")} active={location.pathname === "/" ? true : undefined}>
        {language === 'hu' ? 'Főoldal' : 'Home'}
      </NavbarButton>
      <NavbarButton onClick={() => navigate("/schedule")} active={location.pathname === "/schedule" ? true : undefined}>
        {language === 'hu' ? 'Órarend generálás' : 'Schedule'}
      </NavbarButton>
      <NavbarButton onClick={() => navigate("/testpage")} active={location.pathname === "/testpage" ? true : undefined}>
        {language === 'hu' ? 'Teszt oldal' : 'Test Page'}
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
                  <ListItemText primary={language === 'hu' ? 'Főoldal' : 'Home'} />
                </ListItem>
                <ListItem button onClick={() => { navigate("/schedule"); toggleDrawer(); }}>
                  <ListItemText primary={language === 'hu' ? 'Órarend generálás' : 'Schedule'} />
                </ListItem>
                <ListItem button onClick={() => { navigate("/testpage"); toggleDrawer(); }}>
                  <ListItemText primary={language === 'hu' ? 'Teszt oldal' : 'Test Page'} />
                </ListItem>
                {!user && (
                  <ListItem button onClick={() => { navigate("/login"); toggleDrawer(); }}>
                    <ListItemText primary={language === 'hu' ? 'Bejelentkezés' : 'Login'} />
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
              {language === 'hu' ? 'Bejelentkezés' : 'Login'}
            </CustomButton>
          )
        )}

        <Box>
          <Typography variant="body1">
            {currentUser?.name || "Felhasználó"} {/* Display the user's name */}
          </Typography>
        </Box>

        <IconButton color="inherit" onClick={handleGearMenuClick} sx={{ color: theme.palette.primary.main }}>
          <AnimatedGear animateForward={animateForward} animateBackward={animateBackward} />
        </IconButton>
        <CustomDropdown anchorEl={gearAnchorEl} open={Boolean(gearAnchorEl)} onClose={handleGearMenuClose}>
          <MenuItem>
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </MenuItem>
          <MenuItem>
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="hu">Magyar</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </MenuItem>
        </CustomDropdown>
      </Toolbar>
    </AppBar>
  );
}
