import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaListAlt,
  FaChevronDown,
  FaQuestionCircle,
  FaPlusCircle,
  FaChartBar
} from 'react-icons/fa';
import '../../assets/css/header.css';

const Header = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleAdminMenu = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <FaBook className="app-icon" />
        <span className="app-name">G.MUKONDO QUIZ APP</span>
      </div>

      <nav className="nav-bar">
        <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link>
        <Link to="/register" className="nav-link"><FaUserPlus /> Register</Link>
        <Link to="/dashboard" className="nav-link"><FaTachometerAlt /> Dashboard</Link>
        <Link to="/exams" className="nav-link"><FaListAlt /> Exams</Link>

        <div className="dropdown">
          <button className="nav-link dropdown-toggle" onClick={toggleAdminMenu}>
            <FaChevronDown /> Admin Only
          </button>
          {isAdminOpen && (
            <div className="dropdown-menu">
              <Link to="/question-manager" className="dropdown-item">
                <FaQuestionCircle /> Manage Questions
              </Link>
              <Link to="/add-exam" className="dropdown-item">
                <FaPlusCircle /> Add Exam
              </Link>
              <Link to="/admin-dashboard" className="dropdown-item">
                <FaChartBar /> Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
