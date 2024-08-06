import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarSupport = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span className="fw-bold fs-2">JKI EXPRESS</span>
          <span className="ms-2 fs-6 mt-2">Support</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#faq">FAQ</Nav.Link>
          <Nav.Link href="#customer-service">Customer Service Chat</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarSupport;
