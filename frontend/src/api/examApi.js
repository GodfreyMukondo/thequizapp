import axios from 'axios';

const API_URL = 'http://localhost:8080/api/exams';

export const getAllExams = () => axios.get(API_URL);

export const getExamById = (id) => axios.get(`${API_URL}/${id}`);

export const createExam = (examData) => axios.post(API_URL, examData);

export const updateExam = (id, examData) => axios.put(`${API_URL}/${id}`, examData);

export const deleteExam = (id) => axios.delete(`${API_URL}/${id}`);
