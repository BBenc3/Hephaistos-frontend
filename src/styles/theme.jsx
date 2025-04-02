import { createTheme } from '@mui/material/styles';

// Colors definition (unused colors are commented out for future use)
const colors = {
  primary: "#166B6B",
  secondary: "#FFFFFF",
  background: "#F5F5F5",
  text: "#004C4C",
  accent: "#FF5722",
  paper: "#FFFFFF",
  secondaryText: "#666666",
  loginButton: "#166B6B",
};

// LIGHT THEME CONFIGURATION
const lightThemeConfig = {
  palette: {
    mode: 'light',
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.background },
    text: { primary: colors.text, secondary: colors.secondaryText },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: colors.primary },
            '&:hover fieldset': { borderColor: colors.accent },
            '&.Mui-focused fieldset': { borderColor: colors.primary },
          },
        },
      },
    },
  },
};

const lightTheme = createTheme(lightThemeConfig);

// DARK THEME CONFIGURATION
const darkThemeConfig = {
  palette: {
    mode: 'dark',
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: "#303030" },
    text: { primary: "#E0E0E0", secondary: "#BBBBBB" },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: "#E0E0E0" },
            '&:hover fieldset': { borderColor: colors.accent },
            '&.Mui-focused fieldset': { borderColor: "#E0E0E0" },
          },
        },
      },
    },
  },
};

const darkTheme = createTheme(darkThemeConfig);

// **Generate Theme Function**
export const generateTheme = (mode) => (mode === 'dark' ? darkTheme : lightTheme);
