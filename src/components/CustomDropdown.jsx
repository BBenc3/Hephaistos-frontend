import React from "react";
import { Menu } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomDropdown = ({ anchorEl, open, onClose, children }) => {
  const theme = useTheme();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${theme.palette.primary.main}`,
          animation: 'fadeIn 0.3s ease-in-out',
        },
      }}
      TransitionProps={{
        onExited: () => {
          document.querySelector('.MuiMenu-paper').style.animation = 'fadeOut 0.3s ease-in-out';
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default CustomDropdown;
