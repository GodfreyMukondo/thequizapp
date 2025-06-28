import { useState, useEffect } from 'react';
import * as examApi from '../api/examApi';

const useFetchExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await examApi.getAllExams();
        setExams(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch exams');
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return { exams, loading, error };
};

export default useFetchExams;
