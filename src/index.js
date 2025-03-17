import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme"; // MUI theme importálása
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme(isDarkMode ? "dark" : "light")}>
      <ErrorBoundary>
        <App isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
