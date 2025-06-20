import axios from 'axios';

const API_URL = 'http://localhost:8080/api/results';

export const getAllResults = () => axios.get(API_URL);

export const getResultById = (id) => axios.get(`${API_URL}/${id}`);

export const getResultsByUser = (userId) => axios.get(`${API_URL}/user/${userId}`);

export const createResult = (resultData) => axios.post(API_URL, resultData);

export const updateResult = (id, resultData) => axios.put(`${API_URL}/${id}`, resultData);

export const deleteResult = (id) => axios.delete(`${API_URL}/${id}`);
