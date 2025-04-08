import { useEffect, useState } from "react";
import axios from "axios";

const useMajorSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/me/allsubjects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setSubjects(
        Array.isArray(response.data) // Ensure response is an array
          ? response.data.map((subject) => ({
              id: subject.id,
              name: subject.name,
              majorName: subject.majorName || "N/A", // Handle missing fields
              universityName: subject.universityName || "N/A",
            }))
          : []
      );
      setError(null);
    } catch (err) {
      console.error("Hiba a tárgyak lekérésekor:", err);
      setError("Nem sikerült betölteni a tárgyakat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return { subjects, loading, error, refresh: fetchSubjects };
};

export default useMajorSubjects;
