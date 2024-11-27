import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiUtility/apiUtility';

// Fetch all profiles
export const useFetchProfiles = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['profiles', queryParams], async () => {
    const response = await apiClient.get('/profiles', { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Fetch a single profile by name
export const useFetchProfileByName = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['profile', name, queryParams], async () => {
    const response = await apiClient.get(`/profiles/${name}`, { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Update a profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ name, updatedProfile }) => apiClient.put(`/profiles/${name}`, updatedProfile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile', name]);
        queryClient.invalidateQueries('profiles');
      },
    }
  );

  return mutation;
};

// Fetch bookings by profile name
export const useFetchBookingsByProfile = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['profileBookings', name, queryParams], async () => {
    const response = await apiClient.get(`/profiles/${name}/bookings`, { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Fetch venues by profile name
export const useFetchVenuesByProfile = (name, queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['profileVenues', name, queryParams], async () => {
    const response = await apiClient.get(`/profiles/${name}/venues`, { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};
