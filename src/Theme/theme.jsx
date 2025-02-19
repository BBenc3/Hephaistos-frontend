// src/theme.js
import { createTheme } from "@mui/material/styles";
import colors from "./colors"; // Correct path to colors.js

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    text: {
      primary: colors.text,
    },
  },
  typography: {
    fontWeightBold: "bold",
    fontSize: 16,
  },
});

export default theme;
