import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import '../../assets/css/login.css';
import useAuth from '../../hooks/useAuth.js';


function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(form);

    if (result) {
      const { role } = result;
      if (role === 'admin') {
        navigate('/question-manager');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Login failed. Please try again.');
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
