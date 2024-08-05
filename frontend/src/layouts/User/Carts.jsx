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
  const carts = useSelector((state) =>
    Array.isArray(state.carts.carts) ? state.carts.carts : []
  );

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
        dispatch(
          setCarts(
            carts.map((cart) => (cart.id === cartId ? result.data.cart : cart))
          )
        );
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  const deleteProduct = async (productId) => {
    console.log(productId);
    try {
      const header = { headers: { Authorization: `Bearer ${token}` } };
      const result = await axios.delete(
        `http://localhost:5000/products/${productId}`,
        header
      );

      if (result.data.success) {
        dispatch(setCarts(carts.filter((cart) => cart.id !== productId)));
      }
    } catch (err) {
      console.error("Error updating cart:", err);
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
      const newQuantity =
        currentQuantity > 1 ? currentQuantity - 1 : deleteProduct(cartId);
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

  const deleteCartByUserId = async (userId) => {
    try {
      const header = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/carts/user/${userId}`, header);
      dispatch(setCarts([]));
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
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
                        width: "200x",
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
                          width: "350px",
                          height: "350px",
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
                </Card.Body>
              </Card>
            );
          })}
          <Button
            variant="danger"
            style={{
              fontSize: "1.1rem",
              color: "#fff",
              backgroundColor: "#d9534f",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "20px auto",
            }}
            onClick={() => deleteCartByUserId(userId)}
          >
            Delete all carts
            <DeleteOutlined />
          </Button>
          <h3
            style={{ fontSize: "1.5rem", textAlign: "center", margin: "40px" }}
          >
            Total Price: {calculateTotalPrice().toFixed(2)} JOD
          </h3>
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "50px auto" }}>
          <ShoppingCartOutlined
            style={{ fontSize: "4rem", color: "#d9534f", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "1.5rem", color: "#777" }}>
            Your shopping cart is empty
            <br />
            <br />
            Log in to view your shopping cart and start shopping
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
