import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";
import { Button, Input, message, Form, Typography } from "antd";
import { GoogleLogin } from "@react-oauth/google";

const { Title } = Typography;

const ShopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/shops/login",
        form
      );
      if (response.data.success) {
        dispatch(setLogin(response.data.token));
        dispatch(setShopId(response.data.shopId));
        navigate("/shop");
      } else {
        message.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      message.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/shops/google-login", {
        token: response.credential,
      });

      if (res.data.success) {
        dispatch(setLogin(res.data.token));
        dispatch(setShopId(res.data.shopId));
        navigate("/shop");
      } else {
        message.error(res.data.message || "Google login failed.");
      }
    } catch (error) {
      message.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Title level={2} style={styles.title}>
          Login
        </Title>
        <Form onFinish={handleSubmit} layout="vertical" style={styles.form}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => message.error("Google login failed.")}
              useOneTap
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#F5F5F5",
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    padding: "20px",
    width: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: 600,
  },
  form: {
    margin: "0 auto",
  },
  input: {
    height: "40px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    height: "40px",
  },
};

export default ShopLogin;
