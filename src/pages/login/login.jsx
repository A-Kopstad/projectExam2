import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useFetchAuth'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { mutateAsync: login, isLoading } = useLogin();

  const onSubmit = async (data) => {
    try {
      console.log('Submitting login form with:', data);
      const response = await login({
        email: data.email,
        password: data.password,
      });
      console.log('Login successful:', response);

      // Store data in local storage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('avatar', response.data.avatar?.url || '');

      // Redirect to the desired page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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
