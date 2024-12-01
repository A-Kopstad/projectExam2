import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiUtility/apiUtility';

// Fetch all profiles
export const useFetchProfiles = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profiles', queryParams],
    queryFn: async () => {
      const response = await apiClient.get('/holidaze/profiles', { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Fetch a single profile by name
export const useFetchProfileByName = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profile', name, queryParams],
    queryFn: async () => {
      const response = await apiClient.get(`/holidaze/profiles/${name}`, { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Update a profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ name, updatedProfile }) =>
      apiClient.put(`/holidaze/profiles/${name}`, updatedProfile),
    onSuccess: (_, { name }) => {
      queryClient.invalidateQueries(['profile', name]);
      queryClient.invalidateQueries('profiles');
    },
  });

  return mutation;
};

// Fetch bookings by profile name
export const useFetchBookingsByProfile = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profileBookings', name, queryParams],
    queryFn: async () => {
      const response = await apiClient.get(`/holidaze/profiles/${name}/bookings`, { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Fetch venues by profile name
export const useFetchVenuesByProfile = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profileVenues', name, queryParams],
    queryFn: async () => {
      const response = await apiClient.get(`/holidaze/profiles/${name}/venues`, { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};
