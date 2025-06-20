import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserGraduate,
  FaClipboardList,
  FaPlayCircle,
  FaTrophy,
  FaChartBar,
  FaListUl,
} from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import API from '../api/api';
import '../assets/css/Dashboard.css';

function Dashboard() {
  const { auth } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let url = '/results';
        if (auth.user?.role === 'student') {
          url += `?studentId=${auth.user.id}`;
        }
        const res = await API.get(url);
        setResults(res.data);
      } catch (error) {
        console.error('Failed to fetch results', error);
      }
    };

    if (auth.user) fetchStats();
  }, [auth.user]);

  const totalQuizzes = results.length;
  const highestScore = results.reduce((max, r) => (r.score > max ? r.score : max), 0);
  const averageScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 0;

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2>Welcome to G.MUKONDO Quiz App</h2>
        <p className="intro-text">
          Hello <strong>{auth.user?.username || 'Guest'}</strong>! Explore the features below.
        </p>


        <div className="stats-grid">
          <div className="stat-card">
            <FaListUl size={30} />
            <h4>{totalQuizzes}</h4>
            <p>Total Quizzes</p>
          </div>
          <div className="stat-card">
            <FaTrophy size={30} />
            <h4>{highestScore}</h4>
            <p>Highest Score</p>
          </div>
          <div className="stat-card">
            <FaChartBar size={30} />
            <h4>{averageScore}</h4>
            <p>Average Score</p>
          </div>
        </div>


        <div className="recent-box">
          <h3>Recent Activity</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>Last Login:</strong> {auth.user?.lastLogin || 'Not Available'}</li>
            <li>
              <strong>Last Quiz:</strong>{' '}
              {results.length > 0
                ? `Exam ${results[results.length - 1].examId} (Score: ${results[results.length - 1].score})`
                : 'N/A'}
            </li>
            <li><strong>Total Quizzes Taken:</strong> {results.length}</li>
          </ul>
        </div>

        {/* Navigation Cards */}
        <div className="card-grid">
          <Link to="/exams" className="card-link">
            <FaPlayCircle size={40} />
            <h3>Take a Quiz</h3>
            <p>Test your knowledge now.</p>
          </Link>

          <Link to="/results" className="card-link">
            <FaClipboardList size={40} />
            <h3>View Results</h3>
            <p>See your performance history.</p>
          </Link>

          {auth.user?.role === 'admin' && (
            <Link to="/admin-dashboard" className="card-link">
              <FaUserGraduate size={40} />
              <h3>Admin Panel</h3>
              <p>Manage users, exams, and results.</p>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
