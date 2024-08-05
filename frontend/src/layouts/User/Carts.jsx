import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCarts } from "../../Service/api/redux/reducers/user/carts";
import { Button, Form, Card } from "react-bootstrap";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userId } = useSelector((state) => ({
    token: state.userAuth.token,
    userId: state.userAuth.userId,
  }));
  const { carts } = useSelector((state) => ({
    carts: state.carts.carts,
  }));

  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const getCartsByUserId = () => {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`http://localhost:5000/carts/user/${userId}`, header)
        .then((result) => {
          dispatch(setCarts(result.data.carts));
          const initialQuantities = result.data.carts.reduce((acc, cart) => {
            acc[cart.id] = cart.quantity || 1;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCartsByUserId();
  }, [userId, token, dispatch]);

  const increaseQuantity = (cartId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[cartId] || 1) + 1;
      updateCart(cartId, newQuantity);
      return {
        ...prevQuantities,
        [cartId]: newQuantity,
      };
    });
  };

  const decreaseQuantity = (cartId) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[cartId] || 1;
      const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
      updateCart(cartId, newQuantity);
      return {
        ...prevQuantities,
        [cartId]: newQuantity,
      };
    });
  };

  const handleQuantityChange = (e, cartId) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantities((prevQuantities) => {
        updateCart(cartId, value);
        return {
          ...prevQuantities,
          [cartId]: value,
        };
      });
    }
  };

  const updateCart = (cartId, quantity) => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`http://localhost:5000/carts/${cartId}`, { quantity }, header)
      .then((result) => {
        getCartsByUserId();
        dispatch(setCarts(result.data.carts));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCart = (cartId) => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:5000/carts/${cartId}`, header)
      .then(() => {
        dispatch(setCarts(carts.filter((cart) => cart.id !== cartId)));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, cart) => {
      const quantity = quantities[cart.id] || cart.quantity || 1;
      const itemPrice = parseFloat(cart.total_price) || 0;
      return total + quantity * itemPrice;
    }, 0);
  };

  const handleShopNow = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/LoginUserOrAdmin");
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "2rem",
          color: "#333",
          textAlign: "center",
          margin: "20px",
        }}
      >
        Your Carts
      </h1>
      {carts.length > 0 ? (
        <>
          {carts.map((cart) => {
            const updatedQuantity = quantities[cart.id] || cart.quantity || 1;
            const itemPrice = parseFloat(cart.total_price) || 0;
            const updatedTotalPrice = updatedQuantity * itemPrice;

            return (
              <Card key={cart.id} style={{ margin: "25px" }}>
                <Card.Body>
                  <Card.Title>
                    Product ID: {cart.product_id || "N/A"}
                  </Card.Title>
                  {cart.product_image ? (
                    <Card.Img
                      variant="top"
                      src={cart.product_image}
                      alt={`Image of ${cart.product_name}`}
                      style={{ maxWidth: "200px", marginBottom: "10px" }}
                    />
                  ) : (
                    <div style={{ maxWidth: "200px", marginBottom: "10px" }}>
                      <img
                        src="default-image.jpg"
                        alt="Default Product"
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                  <Card.Text>
                    <strong>Product Name: {cart.product_name || "N/A"}</strong>
                    <br />
                    <strong>
                      Description: {cart.product_description || "N/A"}
                    </strong>
                    <br />
                    <strong>Unit Price: {itemPrice.toFixed(2)} JOD</strong>
                    <br />
                    <strong>
                      Total Price: {updatedTotalPrice.toFixed(2)} JOD
                    </strong>
                  </Card.Text>
                  <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        variant="outline-secondary"
                        onClick={() => decreaseQuantity(cart.id)}
                        style={{ marginRight: "10px" }}
                      >
                        <MinusCircleOutlined />
                      </Button>
                      <Form.Control
                        type="number"
                        value={updatedQuantity}
                        onChange={(e) => handleQuantityChange(e, cart.id)}
                        min="1"
                        style={{
                          width: "100px",
                          textAlign: "center",
                          marginRight: "10px",
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => increaseQuantity(cart.id)}
                      >
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  </Form.Group>
                  <Button variant="danger" onClick={() => deleteCart(cart.id)}>
                    <DeleteOutlined />
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
          <h3
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              margin: "40px",
            }}
          >
            Total Price: {calculateTotalPrice().toFixed(2)} JOD
          </h3>
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "50px auto" }}>
          <ShoppingCartOutlined
            style={{
              fontSize: "4rem",
              color: "#d9534f",
              marginBottom: "20px",
            }}
          />
          <p style={{ fontSize: "1.5rem", color: "#777" }}>
            YOUR CART IS EMPTY
            <br />
            <br />
            Sign in to view your cart and start shopping
            <br />
          </p>
          <Button
            variant="primary"
            onClick={handleShopNow}
            style={{ marginRight: "10px", padding: "10px 20px" }}
          >
            Shop now
          </Button>
          <Button
            variant="secondary"
            onClick={handleLogin}
            style={{ padding: "10px 20px" }}
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default Carts;
