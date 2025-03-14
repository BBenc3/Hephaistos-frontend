import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Notification from "../components/Notification";

//hozzá kell adni egy függvényt amit majd az authcontextből fogunk meghívni
//ez a függvény fogja a user adatait lekérni a backendről
const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const logout = useAuth().logout;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Hiba történt a felhasználói adatok lekérése közben.");
        setLoading(false);
      }
    };

     if (!isLoggedIn) {
       setUser(null);
     }

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        !localStorage.getItem("accessToken") &&
        !localStorage.getItem("refreshToken")
      ) {
        setUser(null);
        setError("Nincs bejelentkezve");
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeactivate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete(
        "https://localhost:5001/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(null);
        setIsDeactivated(true);
        setLoading(false);
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

  const handleUpdate = async (userData) => {
    if (!userData.username || !userData.email) {
      alert("Hiányzó adatok!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Sikeres módosítás!");
        navigate("/profile");
      } else {
        throw new Error("Hiba történt a frissítés során");
      }
    } catch (error) {
      alert("Hálózati hiba:", error);
    }
  };

  return {
    user,
    loading,
    isDeactivated,
    isLoggedIn,
    handleDeactivate,
    handleUpdate,
    errorNotification: error ? <Notification message={error} severity="error" open={true} /> : null,
  };
};

export default useUserData;
