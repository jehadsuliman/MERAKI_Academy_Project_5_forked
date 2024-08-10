import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import { setCarts } from "../../Service/api/redux/reducers/user/carts";
import { Card, Row, Col, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userId } = useSelector((state) => ({
    token: state.userAuth.token,
    userId: state.userAuth.userId,
  }));
  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewCart = (product) => {
    const { id: product_id, price } = product;
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "http://localhost:5000/carts",
        {
          product_id,
          quantity: 1,
          total_price: price,
          user_id: userId,
        },
        header
      )
      .then((result) => {
        dispatch(setCarts(result.data.carts));
        message.success("Product added to cart!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to add product to cart.");
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[30, 30]} justify="center">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{
                    height: "220px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "0px",
                    cursor: "pointer",
                  }}
                />
              }
              style={{
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.)",
              }}
            >
              <Meta
                title={product.title}
                description={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <p style={{ fontSize: "16px", color: "#333", margin: 0 }}>
                      {product.price} JOD
                    </p>
                    <ShoppingCartOutlined
                      style={{
                        fontSize: "30px",
                        color: "#ff7f50",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        createNewCart(product);
                      }}
                    />
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
