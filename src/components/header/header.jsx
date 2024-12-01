import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // User data from localStorage
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  const avatarUrl = localStorage.getItem('avatar');

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');

    // Redirect to login page
    navigate('/login');
    setShowModal(false); 
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Holidaze</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/discover">Discover</Nav.Link>
              {accessToken ? (
                <Nav.Link onClick={toggleModal} className="d-flex align-items-center ms-4">
                <span className="me-2">{username}</span>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={username}
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                )}
              </Nav.Link>
              ) : (
                <>
                  <Nav.Link className='ms-lg-4' as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile/Logout Modal */}
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={username}
                width="60"
                height="60"
                className="rounded-circle mb-3"
              />
            )}
            <p className='fs-5 fw-bold'>{username}</p>
          </div>
          <div className="d-grid gap-2">
            <Button as={Link} to="/profile" variant="success" onClick={toggleModal}>
              Profile
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
