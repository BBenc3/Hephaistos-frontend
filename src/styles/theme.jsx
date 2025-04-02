import { createTheme } from '@mui/material/styles';

// Colors definition (unused colors are commented out for future use)
const colors = {
  primary: "#166B6B", // main color used for buttons and text
  secondary: "#FFFFFF", // secondary background color, e.g., for hover states
  background: "#F5F5F5", // general background color for components like AppBar
  text: "#004C4C", // general text color
  accent: "#FF5722", // an accent color (if needed)
  // error: "#f44336", // error color (unused, reserved for future use)
  // warning: "#ff9800", // warning color (unused, reserved for future use)
  // info: "#2196f3", // info color (unused, reserved for future use)
  // success: "#4caf50", // success color (unused, reserved for future use)
  paper: "#FFFFFF", // paper background color for light mode
  secondaryText: "#666666", // secondary text color for light mode
  loginButton: "#166B6B", // login button color for light mode
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
            '& fieldset': { borderColor: colors.primary },        // Light theme: green border
            '&:hover fieldset': { borderColor: colors.accent },     // Hover: accent (orange)
            '&.Mui-focused fieldset': { borderColor: colors.primary },// Focus state
          },
        },
      },
    },
  },
};

const lightTheme = createTheme(lightThemeConfig);

// DARK THEME: derived from lightTheme via augmentColor() for primary and secondary colors
const darkThemeConfig = {
  palette: {
    mode: 'dark',
    primary: lightTheme.palette.augmentColor({ color: { main: colors.primary } }),
    secondary: lightTheme.palette.augmentColor({ color: { main: colors.secondary } }),
    background: { default: "#303030" },
    text: { primary: "#E0E0E0", secondary: "#BBBBBB" },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: "#E0E0E0" },            // Dark theme: light gray border
            '&:hover fieldset': { borderColor: colors.accent },    // Hover: same accent color
            '&.Mui-focused fieldset': { borderColor: "#E0E0E0" },    // Focus state
          },
        },
      },
    },
  });
};

const darkTheme = createTheme(darkThemeConfig);

// Export a theme function which returns the dark or light theme based on the mode parameter
const theme = (mode) => (mode === 'dark' ? darkTheme : lightTheme);

export default theme;
