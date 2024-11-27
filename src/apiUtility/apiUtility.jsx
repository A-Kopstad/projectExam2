import axios from 'axios';

const API_BASE_URL = 'https://v2.api.noroff.dev';

// Function to get tokens from localStorage
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = import.meta.env.VITE_API_KEY;

  return {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    'x-api-key': apiKey,
  };
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth headers
apiClient.interceptors.request.use((config) => {
  const headers = getAuthHeaders();
  config.headers = {
    ...config.headers,
    ...headers,
  };
  return config;
});

export default apiClient;
