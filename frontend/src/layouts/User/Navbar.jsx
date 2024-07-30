import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">JKI EXPRESS</Navbar.Brand>
        <InputGroup size="sm" className="w-50">
          <Form.Control
            aria-label="Search"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search..."
          />
        </InputGroup>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "24px",
            alignItems: "center",
          }}
        >
          <UserOutlined />
          <ShoppingCartOutlined />
          <HeartOutlined />
          <MessageOutlined />
        </div>
        <Nav className="ml-auto"></Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
