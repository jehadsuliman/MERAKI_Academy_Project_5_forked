import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import {
  AiFillLike,
  AiOutlineComment,
  AiTwotoneLike,
  AiTwotoneSave,
  AiOutlineClose,
  AiOutlineSend,
  AiFillFolderAdd,
  AiFillDelete,
  AiFillEdit,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { Card, Button, Container } from "react-bootstrap";
import { message } from "antd";
import { setCarts } from "../../Service/api/redux/reducers/user/carts";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => ({
    token: state.userAuth.token,
    userId: state.userAuth.userId,
  }));
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  const productDetail = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToFavorite = (product) => {
    const { id: product_id } = product;
    console.log(product_id);
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`http://localhost:5000/favorites`, { product_id }, header)
      .then((result) => {
        message.success("Product added to favorites!");
      })
      .catch((err) => {
        message.error("Failed to add product to favorites.");
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
    productDetail();
  }, []);

  if (!product) {
    return <></>;
  }
  const toggleLike = (product) => {
    setLiked(!liked);
    addToFavorite(product);
  };
  return (
    <Container
      style={{ marginTop: "20px", maxWidth: "1100px", background: "#F5F5F5" }}
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <Card.Img
          variant="top"
          src={product[0].image}
          alt={product[0].title}
          style={{
            width: "50%",
            height: "auto",
            padding: "10px",
            objectFit: "cover",
          }}
        />
        <Card.Body
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Card.Title>{product[0].title}</Card.Title>
            <Card.Text>{product[0].description}</Card.Text>
            <Card.Text>
              <strong>{product[0].price} JOD</strong>
            </Card.Text>
          </div>
          <div>
            <Button
              variant="primary"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                createNewCart(product[0]);
              }}
            >
              Add to Cart <ShoppingCartOutlined />
            </Button>
            <Button
              style={{ border: "none", background: "none", padding: "0" }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(product[0]);
              }}
            >
              {liked ? (
                <AiFillHeart style={{ fontSize: "30px", color: "red" }} />
              ) : (
                <AiOutlineHeart style={{ fontSize: "30px", color: "gray" }} />
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
