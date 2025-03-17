import { createTheme } from '@mui/material/styles';
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
      secondary: colors.secondaryText,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.primary, // Világos téma: zöld border
            },
            '&:hover fieldset': {
              borderColor: colors.accent, // Hover: accent szín (narancs)
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary, // Focus állapot
            },
          },
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
      secondary: darkColors.secondaryText,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: darkColors.text, // Sötét téma: világosszürke border
            },
            '&:hover fieldset': {
              borderColor: darkColors.accent, // Hover: accent szín
            },
            '&.Mui-focused fieldset': {
              borderColor: darkColors.text, // Focus állapot
            },
          },
        },
      },
    },
  },
};

const theme = (mode) => createTheme(mode === 'dark' ? darkTheme : lightTheme);

export default theme;
