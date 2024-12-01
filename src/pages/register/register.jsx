import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useFetchAuth';
import { Link } from 'react-router-dom';
import Message from '../../components/message/message';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { mutateAsync: registerUser, isLoading } = useRegister();
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertVariant, setAlertVariant] = useState(''); // 'success' or 'danger'
  
    const onSubmit = async (data) => {
      try {
        const requestData = {
          name: data.name,
          email: data.email,
          password: data.password,
          venueManager: data.venueManager === 'true', 
        };
  
        await registerUser(requestData);
  
        // Display success message
        setAlertMessage(
          <>
            Registration successful! You can now{' '}
            <Link to="/login" className="text-decoration-none">
              log in
            </Link>.
          </>
        );
        setAlertVariant('success');
      } catch (error) {
        console.error('Registration error:', error);
  
        // Display error message
        setAlertMessage('Registration failed. Please try again.');
        setAlertVariant('danger');
      }
    };
  
    return (
      <div className="container mt-5">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Username Field */}
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              {...register('name', {
                required: 'Username is required',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Username can only contain letters, numbers, and underscores',
                },
              })}
            />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
          </div>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
                  message: 'Email must be a valid stud.noroff.no address',
                },
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </div>
          {/* Venue Manager Toggle */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              {...register('venueManager')}
            />
            <label className="form-check-label">Are you a Venue Manager?</label>
          </div>
          {/* Message component */}
          {alertMessage && (
            <div className="mb-3">
              <Message variant={alertVariant} onClose={() => setAlertMessage(null)}>
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
            {isSubmitting || isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    );
  };
  
  export default Register;