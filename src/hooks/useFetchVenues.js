import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api';

// Fetch all venues
export const useFetchVenues = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['venues', queryParams], async () => {
    const response = await apiClient.get('/venues', { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Fetch a single venue by ID
export const useFetchVenueById = (id, queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['venue', id, queryParams], async () => {
    const response = await apiClient.get(`/venues/${id}`, { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Create a new venue
export const useCreateVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newVenue) => apiClient.post('/venues', newVenue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venues');
      },
    }
  );

  return mutation;
};

// Update an existing venue
export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updatedVenue }) => apiClient.put(`/venues/${id}`, updatedVenue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venues');
        queryClient.invalidateQueries(['venue', id]);
      },
    }
  );

  return mutation;
};

// Delete a venue by ID
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id) => apiClient.delete(`/venues/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('venues');
      },
    }
  );

  return mutation;
};
