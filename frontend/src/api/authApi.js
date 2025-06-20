import api from './api';

const API_URL = '/auth'; // relative to api baseURL

export const login = (credentials) =>
  api.post(`${API_URL}/login`, credentials); // using api instance for consistent config

export const register = (userData) =>
  api.post(`${API_URL}/register`, userData);

export const logout = () =>
  api.post(`${API_URL}/logout`);

export const getCurrentUser = () =>
  api.get(`${API_URL}/me`);
