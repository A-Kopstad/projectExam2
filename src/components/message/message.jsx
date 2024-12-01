import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, onClose }) => {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {children}
    </Alert>
  );
};

export default Message;
