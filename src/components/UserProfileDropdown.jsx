import React from "react";
import { Dropdown } from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons"; // Bootstrap icons
import { useAuth } from "../contexts/AuthContext";
import Skeleton from "react-loading-skeleton"; // You can install this library for a nice skeleton effect
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "@mui/material/styles"; // Importing MUI's theme hook

const UserProfileDropdown = ({ user }) => {
  const { isLoggedIn, handleLogout } = useAuth(); // Get authentication state and logout function
  const theme = useTheme(); // Get the theme

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from the AuthContext
  };

  // Check if user is defined and has the required properties
  const userName = user?.name || "username";
  const userProfilePicture = user?.profilePicture;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="user-profile-dropdown"
        style={{ backgroundColor: theme.palette.primary.main }} // Set the background color to the primary color
      >
        <div className="d-flex align-items-center"> {/* Flexbox for alignment */}
          {/* Profile picture or Skeleton Loader */}
          {userProfilePicture ? (
            <img
              src={userProfilePicture}
              alt="profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          ) : (
            <Skeleton circle width={40} height={40} /> // Skeleton loader when picture is not available
          )}

          {/* Username or Skeleton Loader */}
          <span
            className="ms-2"
            style={{ color: "#FFFFFF" }} // Set the username color to white
          >
            {userName} {/* Fallback to "username" if name is missing */}
          </span>
        </div>
      </Dropdown.Toggle>

      {isLoggedIn && (
        <Dropdown.Menu>
          <Dropdown.Item href="/profile">
            <PersonCircle className="me-2" /> Profil
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogoutClick}>
            <BoxArrowRight className="me-2" /> Kijelentkezés
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default UserProfileDropdown;
