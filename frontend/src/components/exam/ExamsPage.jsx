import React, { useEffect, useState } from 'react';
import ExamList from './ExamList';
import API from '../../api/api';
import Header from '../common/Header';
import Footer from '../common/Footer';

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await API.get('/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <p>Loading exams...</p>;

  return (
      <>
      <Header/>
    <div>
      <h2>Available Exams</h2>
      <ExamList exams={exams} />
    </div>
    <Footer/>
    </>
  );
};

export default ExamsPage;
