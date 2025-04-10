import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useMajorSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Nem sikerült betölteni a tárgyakat.");
        setSubjects([]);
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/me/allsubjects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response data:", response.data); // Log response data for debugging

      // Check if '$values' exists and handle it
      const subjectsData = response.data?.$values || [];

      setSubjects(
        subjectsData.map((subject) => ({
          id: subject.id,
          name: subject.name,
          code: subject.code,
          creditValue: subject.creditValue,
          isElective: subject.isElective,
          isEvenSemester: subject.isEvenSemester,
        }))
      );
      setError(null);
    } catch (err) {
      console.error("Hiba a tárgyak lekérésekor:", err);
      setError("Nem sikerült betölteni a tárgyakat.");
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return {
    subjects,
    loading,
    error,
    refresh: fetchSubjects,
  };
};


export default useMajorSubjects;
