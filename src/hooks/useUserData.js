import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Notification from "../components/Notification";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Függvény a felhasználói adatok lekéréséhez
  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        logout();
        navigate("/login");
      }
      console.error("Error fetching user data:", err);
      setError("Hiba történt a felhasználói adatok lekérése közben.");
      setLoading(false);
    }
  }, [logout, navigate]);

  // Az adatok betöltése a hook inicializálásakor és amikor isLoggedIn változik
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [isLoggedIn, fetchUserData]);

  // Új függvény: frissíti a user adatokat
  const refreshUserData = async () => {
    await fetchUserData();
  };

  const handleDeactivate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setUser(null);
        setError(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        logout();
        navigate("/login");
      }
    } catch (err) {
      console.error("Error deactivating profile:", err);
      setError("Hiba történt a profil inaktiválása során.");
    }
  };

  const fetchAvailableSubjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/subjects`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Error fetching subjects:", err);
      return [];
    }
  };

  const updateCompletedSubjects = async (completedSubjectIds) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/completedSubjects`,
        { completedSubjectIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({ ...prev, completedSubjects: completedSubjectIds }));
    } catch (err) {
      console.error("Error updating completed subjects:", err);
      setError("Hiba történt a tantárgyak frissítése során.");
    }
  };

  // Frissíti a felhasználói adatokat, majd újra lekéri a legfrissebb adatokat
  const updateUserData = async (updatedData) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/me`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Sikeres frissítés után újra lekérjük a frissített user adatokat
      await refreshUserData();
      return true;
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Hiba történt az adatok frissítése során.");
      return false;
    }
  };

  return {
    user,
    loading,
    errorNotification: error ? (
      <Notification message={error} severity="error" open={true} />
    ) : null,
    handleDeactivate,
    fetchAvailableSubjects,
    updateCompletedSubjects,
    updateUserData,
    refreshUserData, // Ha szükséges, exportálhatjuk külön is
  };
};

export default useUserData;
