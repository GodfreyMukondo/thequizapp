import { useState } from 'react';
import * as authApi from '../api/authApi';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.data.token); // save token
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
      return null;
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authApi.register(userData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed');
      return null;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authApi.logout();
      localStorage.removeItem('token'); // remove token on logout
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Logout failed');
    }
  };

  return { login, register, logout, loading, error };
};

export default useAuth;
