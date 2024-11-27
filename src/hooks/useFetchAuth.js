// useFetchAuth.js
import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiUtility/apiUtility';

// Hook for logging in a user
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    },
  });
};

// Hook for registering a new user
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    },
  });
};
