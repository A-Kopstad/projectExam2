import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useFetchAuth'; 
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'; 
import './login.scss';

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
    <div className="login-page">
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <div className="login-box p-4 shadow rounded bg-white">
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register('email', { required: 'Email is required' })}
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
                    {...register('password', { required: 'Password is required' })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Alert for Errors */}
                {alertMessage && (
                  <Alert
                    variant="danger"
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
                  {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
