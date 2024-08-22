// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'your-api-base-url'
});

export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data) => api.post('/transactions', data);
// Add other API calls...