import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  const avatarUrl = localStorage.getItem('avatar');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    // Optionally, redirect to the home page or login page
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Holidaze</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/discover">Discover</Nav.Link>
            {accessToken ? (
              <>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={username}
                      width="30"
                      height="30"
                      className="rounded-circle me-2"
                    />
                  )}
                  {username}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
