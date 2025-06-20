import { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionView() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/questions').then(res => setQuestions(res.data));
  }, []);

  return (
    <div>
      <h2>View Questions</h2>
      {questions.map((q) => (
        <div key={q._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h4>{q.question}</h4>
          <ul>
            <li>A: {q.optionA}</li>
            <li>B: {q.optionB}</li>
            <li>C: {q.optionC}</li>
            <li>D: {q.optionD}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuestionView;
