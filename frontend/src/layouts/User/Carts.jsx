import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setCarts,
  updateCartsById,
  deleteCartsById,
} from "../../Service/api/redux/reducers/user/carts";
import { Button, Form, Card } from "react-bootstrap";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PaymentForm from "./PaymentForm";

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
    <div style={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <h1
        style={{
          fontSize: "2rem",
          color: "#333",
          textAlign: "center",
          marginBottom: "20px",
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
                  margin: "20px 0",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  padding: "15px",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {cart.image ? (
                    <Card.Img
                      variant="top"
                      src={cart.image}
                      alt={`Image of ${cart.title}`}
                      style={{
                        width: "150px",
                        height: "150px",
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
                  <div style={{ marginLeft: "20px", flex: 1 }}>
                    <div style={{ marginBottom: "10px" }}>
                      <strong>{cart.title || "N/A"}</strong>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong>Unit Price:</strong> {itemPrice.toFixed(2)} JOD
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong>Total Price:</strong>{" "}
                      {updatedTotalPrice.toFixed(2)} JOD
                    </div>
                    <Form.Group
                      controlId="quantity"
                      style={{ marginBottom: "10px" }}
                    >
                      <Form.Label>Quantity</Form.Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Button
                          variant="outline-secondary"
                          onClick={() => decreaseQuantity(cart.id)}
                          style={{ flexShrink: 0 }}
                        >
                          <MinusCircleOutlined />
                        </Button>
                        <Form.Control
                          type="number"
                          value={updatedQuantity}
                          onChange={(e) => handleQuantityChange(e, cart.id)}
                          min="1"
                          style={{
                            width: "80px",
                            textAlign: "center",
                            flexShrink: 0,
                          }}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => increaseQuantity(cart.id)}
                          style={{ flexShrink: 0 }}
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
                        padding: "8px 16px",
                        borderRadius: "5px",
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
          <div
            style={{
              marginTop: "30px",
              fontSize: "40px",
              padding: "40px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <h3>Total Items Quantity: {calculateTotalQuantity()}</h3>
            <h3>Total Order Amount: {calculateTotalPrice().toFixed(2)} JOD</h3>

            <Button
              variant="primary"
              onClick={handleCheckout}
              style={{ marginRight: "20px", alignItems: "center" }}
            >
              <h6 style={{margin: "2px"}}>Cash on Delivery</h6>
            </Button>
            <PaymentForm cart={carts}/>
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
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
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
