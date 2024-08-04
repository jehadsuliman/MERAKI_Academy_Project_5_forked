import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Card, Button, Container, Form } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const ProductDetail = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ProductDetail();
  }, []);

  if (!product) {
    return <></>;
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Card.Img
          variant="top"
          src={product[0].image}
          alt={product[0].title}
          style={{ height: "400px", width: "50%", padding: "10px" }}
        />
        <Card.Body style={{ width: "50%" }}>
          <Card.Title>{product[0].title}</Card.Title>
          <Card.Text>{product[0].description}</Card.Text>
          <Card.Text>
            <strong>{product[0].price} JOD</strong>
          </Card.Text>

          <Button
            variant="primary"
            style={{ marginRight: "10px" }}
            className="w-75"
            onClick={() => {}}
          >
            Add to Cart <ShoppingCartOutlined />
          </Button>
          <Button
            variant="outline-secondary"
            className="w-10"
            onClick={() => {}}
          >
            <HeartOutlined />
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
