import { useState, useEffect } from "react";
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

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (isMounted) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          logout();
          navigate("/login");
        }
        if (isMounted) {
          console.error("Error fetching user data:", err);
          setError("Hiba történt a felhasználói adatok lekérése közben.");
          setLoading(false);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      setUser(null);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

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
      // Ensure the returned value is an array
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

  return {
    user,
    loading,
    errorNotification: error ? (
      <Notification message={error} severity="error" open={true} />
    ) : null,
    handleDeactivate,
    fetchAvailableSubjects,
    updateCompletedSubjects,
  };
};

export default useUserData;
