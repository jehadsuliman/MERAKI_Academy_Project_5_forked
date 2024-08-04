import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setProducts } from "../../Service/api/redux/reducers/shop/product"; 

const NavbarComponent = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

  const search = (searchTerm) => {
    const filter = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setProducts(filter));
  };

  return (
    <Navbar bg="light" expand="lg" >
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">JKI EXPRESS</Navbar.Brand>
        <InputGroup size="sm" className="w-50">
          <Form.Control
            aria-label="Search"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
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
