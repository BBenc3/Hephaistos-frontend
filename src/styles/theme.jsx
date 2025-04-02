import { createTheme } from "@mui/material/styles";
import { lightColors, darkColors } from "./colors";

// Téma létrehozása a darkMode állapot alapján
const generateTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: { main: mode === "dark" ? darkColors.primary : lightColors.primary },
      secondary: { main: mode === "dark" ? darkColors.secondary : lightColors.secondary },
      background: { default: mode === "dark" ? darkColors.background : lightColors.background },
      text: { primary: mode === "dark" ? darkColors.text : lightColors.text },
      error: { main: mode === "dark" ? darkColors.error : lightColors.error },
      warning: { main: mode === "dark" ? darkColors.warning : lightColors.warning },
      info: { main: mode === "dark" ? darkColors.info : lightColors.info },
      success: { main: mode === "dark" ? darkColors.success : lightColors.success },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? darkColors.background : lightColors.background,
            color: mode === "dark" ? darkColors.text : lightColors.text,
            height: "100vh",
            width: "100vw",
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTouchCallout: "none",
            MozUserSelect: "none",
            MsUserSelect: "none",
          },
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: mode === "dark" ? darkColors.scrollbarTrack : lightColors.scrollbarTrack,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "dark" ? darkColors.scrollbarThumb : lightColors.scrollbarThumb,
            borderRadius: "20px",
            border: `3px solid ${mode === "dark" ? darkColors.scrollbarTrack : lightColors.scrollbarTrack}`,
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: mode === "dark" ? darkColors.text : lightColors.text,
          },
          img: {
            WebkitUserDrag: "none",
            userDrag: "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: mode === "dark" ? darkColors.text : lightColors.primary,
              },
              "&:hover fieldset": {
                borderColor: mode === "dark" ? darkColors.accent : lightColors.accent,
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? darkColors.text : lightColors.primary,
              },
            },
          },
        },
      },
    },
  });
};

export default generateTheme;
