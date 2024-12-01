import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useFetchAuth'; 
import { useNavigate } from 'react-router-dom';
import Message from '../../components/message/message'; // Import reusable Message component

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { mutateAsync: login, isLoading } = useLogin();
  const [alertMessage, setAlertMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      // Store user data in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('avatar', response.data.avatar?.url || '');

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);

      // Display error message
      setAlertMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        
        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>
        {/* Message Component */}
        {alertMessage && (
          <div className="mb-3">
            <Message variant="danger" onClose={() => setAlertMessage(null)}>
              {alertMessage}
            </Message>
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
