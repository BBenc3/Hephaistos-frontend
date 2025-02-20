import { createTheme } from "@mui/material/styles";
import { colors, darkColors } from "./colors";

const lightTheme = {
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
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontWeightBold: "bold",
    fontSize: 16,
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: darkColors.primary, // Use the more contrasting shade for dark mode
    },
    secondary: {
      main: darkColors.secondary,
    },
    background: {
      default: darkColors.background,
    },
    text: {
      primary: darkColors.text,
    },
    error: {
      main: darkColors.error,
    },
    warning: {
      main: darkColors.warning,
    },
    info: {
      main: darkColors.info,
    },
    success: {
      main: darkColors.success,
    },
  },
  typography: {
    fontWeightBold: "bold",
    fontSize: 16,
  },
};

const theme = (mode) => createTheme(mode === 'dark' ? darkTheme : lightTheme);

export default theme;