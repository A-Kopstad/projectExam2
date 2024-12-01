import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnLoader = ({ message = 'Loading...', size = 'md' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status" size={size}>
        <span className="visually-hidden">{message}</span>
      </Spinner>
    </div>
  );
};

export default SpinnLoader;
