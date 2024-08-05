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
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px", cursor: "pointer" }}
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
