import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/universities`);
        const normalizedData = Array.isArray(response.data?.$values)
          ? response.data.$values.map(university => ({
              ...university,
              majors: university.majors?.$values || [], // Extract majors.$values
            }))
          : [];
        setUniversities(normalizedData);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
        setError(err);
        setUniversities([]); // Ensure universities is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return { universities, loading, error };
};
