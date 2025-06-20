import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../common/Header';
import Footer from '../common/Footer';
import '../../assets/css/login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem('token', token); //store token
        login(user, token);                   //update context
        navigate('/dashboard');
      } else {
        setError('Invalid login response.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <>
      <Header />

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
