import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import { Card, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[10, 10]}>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={8} md={6} lg={4}>
            <Card
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{ height: "200px", width: "100%" }}
                />
              }
            >
              <Meta
                title={product.title}
                description={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "15px", paddingTop: "10px" }}>
                      {product.price} JOD
                    </p>
                    <ShoppingCartOutlined style={{ fontSize: "20px" }} />
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
