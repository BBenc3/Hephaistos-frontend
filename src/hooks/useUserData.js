import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Hiba történt a felhasználói adatok lekérése közben.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeactivate = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.delete('https://localhost:5001/api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUser(null);
        setIsDeactivated(true);
        navigate('/login');
      }
    } catch (err) {
      console.error('Error deactivating profile:', err);
      setError('Hiba történt a profil inaktiválása során.');
    }
  };

  const handleUpdate = async (userData) => {
    if (!userData.username || !userData.email) {
      alert('Hiányzó adatok!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Sikeres módosítás!');
        navigate('/profile');
      } else {
        alert('Hiba történt a frissítés során');
      }
    } catch (error) {
      alert('Hálózati hiba:', error);
    }
  };

  return {
    user,
    loading,
    error,
    isDeactivated,
    isLoggedIn,
    handleDeactivate,
    handleUpdate,
  };
};

export default useUserData;
