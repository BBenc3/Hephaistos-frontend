import React from "react";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Button = styled(MuiButton)(({ theme, size = "medium", width, height, bgColor, textColor }) => {
  return {
    backgroundColor: bgColor || theme.palette.primary.main,
    color: textColor || theme.palette.common.white,
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    transition: "background-color 0.3s ease, width 0.3s ease, height 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: width || (size === "large" ? "250px" : size === "small" ? "150px" : "200px"),
    height: height || (size === "large" ? "40px" : size === "small" ? "30px" : "35px"),
    fontSize: size === "large" ? "16px" : size === "small" ? "14px" : "15px",
    [theme.breakpoints.down("sm")]: {
      width: width || (size === "large" ? "200px" : size === "small" ? "120px" : "180px"),
      height: height || (size === "large" ? "35px" : size === "small" ? "25px" : "30px"),
      fontSize: size === "large" ? "14px" : size === "small" ? "12px" : "13px",
    },
  };
});

export default Button;