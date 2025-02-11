import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme, size }) => {
  if (size !== "small" && size !== "large") {
    throw new Error("Invalid size prop. Allowed values: 'small' or 'large'");
  }

  return {
    backgroundColor: theme.palette.primary.main, // Use primary color from theme
    color: theme.palette.common.white, // Use white color for text from theme
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold, // Use bold font weight from theme
    transition: "background-color 0.3s ease, width 0.3s ease, height 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Use dark shade of primary color from theme for hover
    },
    width: size === "large" ? "250px" : "150px",
    height: size === "large" ? "40px" : "30px",
    fontSize: size === "large" ? "16px" : "14px",
    [theme.breakpoints.down("sm")]: {
      width: size === "large" ? "200px" : "120px",
      height: size === "large" ? "35px" : "25px",
      fontSize: size === "large" ? "14px" : "12px",
    },
  };
});

export default CustomButton;
