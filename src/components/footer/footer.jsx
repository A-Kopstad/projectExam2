import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} Holidaze. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
