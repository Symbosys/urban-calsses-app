import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  timeout: 30000, // 30 seconds for better reliability with remote databases
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in headers
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
