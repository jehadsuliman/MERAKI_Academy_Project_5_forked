import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const NavbarSupport = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="px-3" style={{ backgroundColor: "#000" }}>
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span
            className="fw-bold fs-2"
            style={{ color: "#fff", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            JKI <span style={{ color: "#FFA07A" }}>E</span>XPRESS
          </span>

          <span
            className="ms-2 fs-6 mt-2"
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Support
          </span>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" style={{ color: "#fff" }}>
            Home
          </Nav.Link>{" "}
          <Nav.Link as={Link} to="/faq" style={{ color: "#fff" }}>
            FAQ
          </Nav.Link>{" "}
          <Nav.Link href="#customer-service" style={{ color: "#fff" }}>
            Customer Service Chat
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarSupport;
