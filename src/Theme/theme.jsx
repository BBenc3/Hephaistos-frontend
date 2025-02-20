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
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.background,
          border: `1px solid ${colors.primary}`,
          animation: 'fadeIn 0.3s ease-in-out',
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: darkColors.primary,
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
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: darkColors.background,
          border: `1px solid ${darkColors.primary}`,
          animation: 'fadeIn 0.3s ease-in-out',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.background,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: darkColors.text,
            },
            '&:hover fieldset': {
              borderColor: darkColors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: darkColors.primary,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.primary,
          color: darkColors.text,
          '&:hover': {
            backgroundColor: darkColors.primary,
          },
        },
      },
    },
  },
};

const theme = (mode) => createTheme(mode === 'dark' ? darkTheme : lightTheme);

export default theme;