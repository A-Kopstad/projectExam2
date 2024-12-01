import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiUtility/apiUtility';

// Fetch all venues
export const useFetchVenues = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['venues', queryParams],
    queryFn: async () => {
      const response = await apiClient.get('/holidaze/venues', { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Fetch a single venue by ID
export const useFetchVenueById = (id, queryParams = {}) => {
    const { data, error, isLoading } = useQuery({
      queryKey: ['venue', id, queryParams],
      queryFn: async () => {
        if (!id) {
          throw new Error('Invalid venue ID');
        }
        const response = await apiClient.get(`/holidaze/venues/${id}`, { params: queryParams });
        return response.data;
      },
      enabled: !!id, 
    });
  
    return { data, error, isLoading };
  };
  

// Create a new venue
export const useCreateVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newVenue) => apiClient.post('/holidaze/venues', newVenue),
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
    },
  });

  return mutation;
};

// Update an existing venue
export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updatedVenue }) =>
      apiClient.put(`/holidaze/venues/${id}`, updatedVenue),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries('venues');
      queryClient.invalidateQueries(['venue', id]);
    },
  });

  return mutation;
};

// Delete a venue by ID
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/holidaze/venues/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
    },
  });

  return mutation;
};
