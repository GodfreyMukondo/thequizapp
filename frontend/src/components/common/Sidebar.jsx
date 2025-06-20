import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaBook, FaChartBar, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/css/Sidebar.css';

function Sidebar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Menu</h3>
      <ul className="sidebar-list">
        <li><Link to="/" className={isActive('/') ? 'sidebar-link active' : 'sidebar-link'}><FaHome /> Home</Link></li>
        <li><Link to="/dashboard" className={isActive('/dashboard') ? 'sidebar-link active' : 'sidebar-link'}><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="/exams" className={isActive('/exams') ? 'sidebar-link active' : 'sidebar-link'}><FaBook /> Exams</Link></li>
        <li><Link to="/results" className={isActive('/results') ? 'sidebar-link active' : 'sidebar-link'}><FaChartBar /> Results</Link></li>

        {!auth.user ? (
          <>
            <li><Link to="/login" className={isActive('/login') ? 'sidebar-link active' : 'sidebar-link'}><FaSignInAlt /> Login</Link></li>
            <li><Link to="/register" className={isActive('/register') ? 'sidebar-link active' : 'sidebar-link'}><FaUserPlus /> Register</Link></li>
          </>
        ) : (
          <li className="sidebar-link logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
