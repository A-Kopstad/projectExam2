import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiUtility/apiUtility';

// Fetch all bookings
export const useFetchBookings = (queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['bookings', queryParams],
    queryFn: async () => {
      const response = await apiClient.get('/holidaze/bookings', { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Fetch a single booking by ID
export const useFetchBookingById = (id, queryParams = {}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['booking', id, queryParams],
    queryFn: async () => {
      const response = await apiClient.get(`/holidaze/bookings/${id}`, { params: queryParams });
      return response.data;
    },
  });

  return { data, error, isLoading };
};

// Create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBooking) => apiClient.post('/holidaze/bookings', newBooking),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']); 
    },
    onError: (error) => {
        console.error("Error creating booking: ", error.response?.data || error.message);
        setBookingError("Failed to create booking. Please try again.");
      }
  });

  return mutation;
};

// Update an existing booking
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updatedBooking }) =>
      apiClient.put(`/holidaze/bookings/${id}`, updatedBooking),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['bookings']);  
      queryClient.invalidateQueries(['booking', id]);  
    },
    onError: (error) => {
      console.error("Error updating booking: ", error);
    }
  });

  return mutation;
};

// Delete a booking by ID
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/holidaze/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);  
    },
    onError: (error) => {
      console.error("Error deleting booking: ", error);
    }
  });

  return mutation;
};
