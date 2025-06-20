import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as examApi from '../../api/examApi';
import '../../assets/css/examDetail.css';

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await examApi.getExamById(id);
        setExam(response.data);
      } catch (err) {
        setError('Failed to load exam');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  if (loading) return <p>Loading exam...</p>;
  if (error) return <p>{error}</p>;
  if (!exam) return <p>Exam not found.</p>;

  return (
    <div className="exam-detail-container">
      <h2>{exam.title}</h2>
      <p>{exam.description}</p>
      <h4>Questions:</h4>
      <ul>
        {exam.questions.map((q, index) => (
          <li key={index}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExamDetail;
