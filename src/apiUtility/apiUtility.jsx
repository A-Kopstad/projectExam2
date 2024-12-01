import axios from 'axios';

const API_BASE_URL = 'https://v2.api.noroff.dev';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = import.meta.env.VITE_API_KEY; 

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.error('AccessToken is missing or not set in localStorage');
    }

    if (apiKey) {
      config.headers['X-Noroff-API-Key'] = apiKey; 
    } else {
      console.error('API Key is missing or not set in .env file');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
