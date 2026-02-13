import axios from 'axios';

// Create an axios instance with a custom config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('forsee_access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if token is invalid
      localStorage.removeItem('forsee_access_token');
      localStorage.removeItem('forsee_user');
      localStorage.removeItem('forsee_role');
      // Ideally, we'd use a more robust navigation method here or dispatch a global event
      // For now, let the AuthContext handle the state based on the cleared storage
      // or window.location.href = '/login'; // Force reload/redirect
    }
    return Promise.reject(error);
  }
);

export default api;
