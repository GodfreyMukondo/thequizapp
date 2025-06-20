import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import '../../assets/css/questionManager.css';
import Header from '../common/Header';
import Footer from '../common/Footer';

function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct_answer: '',
    exam_id: '',
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/questions');
      setQuestions(res.data);
    } catch (err) {
      console.error('Failed to fetch questions', err.response || err);
      alert('Failed to fetch questions');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'correct_answer' ? value.toUpperCase() : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // This Prepare data for backend: exam -> { id: exam_id }
    const payload = {
      ...form,
      exam: { id: parseInt(form.exam_id, 10) }
    };
    delete payload.exam_id;

    try {
      if (editingId) {
        await api.put(`/questions/${editingId}`, payload);
      } else {
        await api.post('/questions', payload);
      }
      setForm({
        content: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct_answer: '',
        exam_id: '',
      });
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      console.error('Submission failed', err.response || err);
      alert(`Failed to submit question: ${err.response?.data?.message || err.message}`);
    }
  };

  const startEditing = (q) => {
    setEditingId(q.id);
    setForm({
      content: q.content,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correct_answer: q.correct_answer,
      exam_id: q.exam?.id?.toString() || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      console.error('Delete failed', err.response || err);
      alert(`Failed to delete question: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main className="content-wrapper">
          <div className="container">
            <h2 className="mb-4">{editingId ? 'Edit MCQ' : 'Add New MCQ'}</h2>
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="form-group">
                <label>Exam ID:</label>
                <input
                  type="number"
                  className="form-control"
                  name="exam_id"
                  value={form.exam_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Question:</label>
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Option A:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="optionA"
                    value={form.optionA}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col">
                  <label>Option B:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="optionB"
                    value={form.optionB}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col">
                  <label>Option C:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="optionC"
                    value={form.optionC}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col">
                  <label>Option D:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="optionD"
                    value={form.optionD}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correct Answer (A/B/C/D):</label>
                <input
                  type="text"
                  className="form-control"
                  name="correct_answer"
                  value={form.correct_answer}
                  onChange={handleChange}
                  maxLength="1"
                  pattern="[ABCD]"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Question' : 'Add Question'}
              </button>
            </form>

            <h3>All MCQs</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Exam ID</th>
                  <th>Question</th>
                  <th>Option A</th>
                  <th>Option B</th>
                  <th>Option C</th>
                  <th>Option D</th>
                  <th>Correct</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No questions available</td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q.id}>
                      <td>{q.exam?.id || 'N/A'}</td>
                      <td>{q.content}</td>
                      <td>{q.optionA}</td>
                      <td>{q.optionB}</td>
                      <td>{q.optionC}</td>
                      <td>{q.optionD}</td>
                      <td>{q.correct_answer}</td>
                      <td>
                        <button className="btn btn-sm btn-warning mr-2" onClick={() => startEditing(q)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default QuestionManager;
