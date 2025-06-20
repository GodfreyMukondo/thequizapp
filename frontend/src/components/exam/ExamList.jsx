import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/examList.css';

const ExamList = ({ exams }) => {
  if (!exams || exams.length === 0) {
    return <p>No exams available.</p>;
  }

  return (
    <div className="exam-list-container">
      {exams.map((exam) => (
        <div key={exam.id} className="exam-card">
          <Link to={`/exams/${exam.id}`}>
            <h3>{exam.title}</h3>
          </Link>
          <p>{exam.description || 'No description provided.'}</p>
        </div>
      ))}
    </div>
  );
};


export default ExamList;
