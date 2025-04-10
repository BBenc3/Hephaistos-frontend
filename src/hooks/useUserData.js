import { useState, useEffect, useCallback, useRef } from "react";
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
  const isMountedRef = useRef(true);


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
      console.log("User data response:", response.data); // Debugging line
      if (isMountedRef.current) {
        const data = response.data;
        const formattedUser = {
          ...data,
          completedSubjects: {
            ...data.completedSubjects,
            values: data.completedSubjects?.$values || [],
          },
        };
        setUser(formattedUser);
        setLoading(false);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      } else {
        console.error("Error fetching user data:", err);
        if (isMountedRef.current) {
          setError("Hiba történt a felhasználói adatok lekérése közben.");
          setLoading(false);
        }
      }
    }
  }, [logout, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [isLoggedIn, fetchUserData]);

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

  const updateCompletedSubjects = async (completedSubjectIds) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/completedSubjects`,
        { completedSubjectIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({
        ...prev,
        completedSubjects: {
          ...prev.completedSubjects,
          values: completedSubjectIds,
        },
      }));
    } catch (err) {
      console.error("Error updating completed subjects:", err);
      setError("Hiba történt a tantárgyak frissítése során.");
    }
  };

  const updateUserDetails = async (updatedDetails) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/me`,
        updatedDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (err) {
      console.error("Error updating user details:", err);
      setError("Hiba történt a felhasználói adatok frissítése során.");
    }
  };

  return {
    user,
    loading,
    errorNotification: error ? (
      <Notification message={error} severity="error" open={true} />
    ) : null,
    handleDeactivate,
    updateCompletedSubjects,
    updateUserDetails,
    refreshUserData,
  };
};

export default useUserData;
