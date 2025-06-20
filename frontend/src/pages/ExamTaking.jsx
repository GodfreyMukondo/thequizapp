import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ExamTaking() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(60 * 5); // 5 minutes
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/exams/${examId}/questions`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error('Failed to load questions', err));
  }, [examId]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const result = {
      examId,
      answers,
      timestamp: new Date().toISOString(),
    };

    axios
      .post('http://localhost:8080/api/results', result)
      .then(() => {
        alert('Exam submitted successfully!');
        navigate('/results');
      })
      .catch((err) => console.error('Submission error', err));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!questions.length) return <p>Loading questions...</p>;
  if (submitted) return <p>Submitting...</p>;

  const question = questions[current];

  return (
    <div>
      <h2>Taking Exam {examId}</h2>
      <p><strong>Time Remaining:</strong> {formatTime(timer)}</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>
          Q{current + 1}: {question.text}
        </h4>
        {question.options.map((opt, i) => (
          <div key={i}>
            <label>
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt}
                checked={answers[question.id] === opt}
                onChange={() => handleOptionChange(question.id, opt)}
              />
              {opt}
            </label>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleBack} disabled={current === 0}>
          Back
        </button>
        <button onClick={handleNext} disabled={current === questions.length - 1}>
          Next
        </button>
        {current === questions.length - 1 && (
          <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default ExamTaking;
