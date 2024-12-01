import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/useFetchAuth';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './register.scss';

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { mutateAsync: registerUser, isLoading } = useRegister();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState(''); 

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
    <div className='register-page'>
    <Container className="h-100 d-flex justify-content-center align-items-center ">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="register-box p-4 shadow rounded bg-white">
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Username Field */}
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  {...register('name', {
                    required: 'Username is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Username can only contain letters, numbers, and underscores',
                    },
                  })}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
                      message: 'Email must be a valid stud.noroff.no address',
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Venue Manager Toggle */}
              <Form.Group controlId="formVenueManager" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Are you a Venue Manager?"
                  {...register('venueManager')}
                />
              </Form.Group>

              {/* Alert for Success/Error Messages */}
              {alertMessage && (
                <Alert
                  variant={alertVariant}
                  onClose={() => setAlertMessage(null)}
                  dismissible
                  className="mb-3"
                >
                  {alertMessage}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container></div>
  );
};

export default Register;
