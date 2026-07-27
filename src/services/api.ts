import axios from 'axios';

// Helper function for mock delays (if used by services)
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
