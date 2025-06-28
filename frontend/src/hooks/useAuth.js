import { useState } from 'react';
import * as authApi from '../api/authApi';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      const { token } = response.data;

      localStorage.setItem('token', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role?.toLowerCase();

      setLoading(false);
      return { ...response.data, role };
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
      localStorage.removeItem('token');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Logout failed');
    }
  };

  return { login, register, logout, loading, error };
};

export default useAuth;
