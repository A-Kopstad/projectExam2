import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api';

// Fetch all bookings
export const useFetchBookings = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['bookings', queryParams], async () => {
    const response = await apiClient.get('/bookings', { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Fetch a single booking by ID
export const useFetchBookingById = (id, queryParams = {}) => {
  const { data, error, isLoading } = useQuery(['booking', id, queryParams], async () => {
    const response = await apiClient.get(`/bookings/${id}`, { params: queryParams });
    return response.data;
  });

  return { data, error, isLoading };
};

// Create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newBooking) => apiClient.post('/bookings', newBooking),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookings');
      },
    }
  );

  return mutation;
};

// Update an existing booking
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ id, updatedBooking }) => apiClient.put(`/bookings/${id}`, updatedBooking),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookings');
        queryClient.invalidateQueries(['booking', id]);
      },
    }
  );

  return mutation;
};

// Delete a booking by ID
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id) => apiClient.delete(`/bookings/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookings');
      },
    }
  );

  return mutation;
};
