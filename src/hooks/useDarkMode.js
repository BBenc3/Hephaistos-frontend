import { useState, useEffect } from "react";

const useDarkMode = () => {
  // Kezdeti állapot beállítása, amely a localStorage-ból jön, ha van, vagy false, ha nincs
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ellenőrzi, hogy van-e darkMode beállítás a localStorage-ban
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false; // Ha nincs, alapértelmezett false
  });

  // Az állapot frissítése és a darkMode mentése a localStorage-ba
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode)); // Mentés
    document.body.classList.toggle("dark-mode", isDarkMode); // Téma beállítása a body-nál
  }, [isDarkMode]); // Csak akkor fut le, ha az isDarkMode változik

  // Az állapot megfordítása (toggle)
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return [isDarkMode, toggleDarkMode];
};

export { useDarkMode };
