import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setCarts,
  addCarts,
  updateCartsById,
  deleteCartsById,
} from "../../Service/api/redux/reducers/user/carts";
import { Button, Form, Card } from "react-bootstrap";
import {
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
  const carts = useSelector((state) => state.carts.carts || []);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const getCartsByUserId = async () => {
      try {
        const header = { headers: { Authorization: `Bearer ${token}` } };
        const result = await axios.get(
          `http://localhost:5000/carts/user/${userId}`,
          header
        );
        if (Array.isArray(result.data.carts)) {
          dispatch(setCarts(result.data.carts));
          const initialQuantities = result.data.carts.reduce((acc, cart) => {
            acc[cart.id] = cart.quantity || 1;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error("Unexpected data format:", result.data.carts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getCartsByUserId();
  }, [userId, token, dispatch]);

  const addToCart = async (product_id, quantity, total_price) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/carts",
        { product_id, quantity, total_price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(addCarts(response.data.cart));
      } else {
        console.error("Error adding to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateCart = async (cartId, quantity) => {
    try {
      const header = { headers: { Authorization: `Bearer ${token}` } };
      const result = await axios.put(
        `http://localhost:5000/carts/${cartId}`,
        { quantity },
        header
      );
      if (result.data.success && result.data.cart) {
        dispatch(updateCartsById(result.data.cart));
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const header = { headers: { Authorization: `Bearer ${token}` } };
      const result = await axios.delete(
        `http://localhost:5000/carts/${cartId}`,
        header
      );
      if (result.data.success) {
        dispatch(deleteCartsById(cartId));
      }
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
  };

  const increaseQuantity = (cartId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[cartId] || 1) + 1;
      updateCart(cartId, newQuantity);
      return { ...prevQuantities, [cartId]: newQuantity };
    });
  };

  const decreaseQuantity = (cartId) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[cartId] || 1;
      const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
      updateCart(cartId, newQuantity);
      return { ...prevQuantities, [cartId]: newQuantity };
    });
  };

  const handleQuantityChange = (e, cartId) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantities((prevQuantities) => {
        updateCart(cartId, value);
        return { ...prevQuantities, [cartId]: value };
      });
    }
  };

  const calculateTotalPrice = () => {
    return carts.reduce((total, cart) => {
      const quantity = quantities[cart.id] || cart.quantity || 1;
      const itemPrice = parseFloat(cart.total_price) || 0;
      return total + quantity * itemPrice;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return carts.reduce((total, cart) => {
      return total + (quantities[cart.id] || cart.quantity || 1);
    }, 0);
  };

  const handleCheckout = () => {
    navigate("/address");
  };

  const handleShopNow = () => {
    navigate("/");
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
              <Card
                key={cart.id}
                style={{
                  margin: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    flex: "0 0 150px",
                    margin: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Product ID:</strong> {cart.product_id || "N/A"}
                  </div>
                  {cart.image ? (
                    <Card.Img
                      variant="top"
                      src={cart.image}
                      alt={`Image of ${cart.title}`}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src="default-image.jpg"
                        alt="Default Product"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </div>
                <Card.Body style={{ flex: "1 1 auto" }}>
                  <Card.Title>
                    <strong>{cart.title || "N/A"}</strong>
                  </Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {cart.description || "N/A"}
                    <br />
                    <strong>Unit Price:</strong> {itemPrice.toFixed(2)} JOD
                    <br />
                    <strong>Total Price:</strong> {updatedTotalPrice.toFixed(2)}{" "}
                    JOD
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
                  <Button
                    variant="danger"
                    onClick={() => deleteCart(cart.id)}
                    style={{
                      fontSize: "1rem",
                      color: "#fff",
                      backgroundColor: "#d9534f",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Remove
                    <DeleteOutlined />
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
          <div
            style={{
              margin: "25px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>Total Quantity: {calculateTotalQuantity()}</h3>
            <h3>Total Price: {calculateTotalPrice().toFixed(2)} JOD</h3>
            <Button
              variant="primary"
              onClick={handleCheckout}
              style={{ marginRight: "10px" }}
            >
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            margin: "20px auto",
            padding: "20px",
            textAlign: "center",
            fontSize: "1.5rem",
            color: "#666",
          }}
        >
          YOUR CART IS EMPTY <br />
          <Button variant="primary" onClick={handleShopNow}>
            Shop Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Carts;
