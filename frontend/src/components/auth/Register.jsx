import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import '../../assets/css/register.css';
import Footer from '../common/Footer';


function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:8080/api/auth/register', form);
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
      <>
          <Header/>
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

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
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Register</button>
    </form>
    <Footer/>
    </>
  );
}

export default Register;
