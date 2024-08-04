import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";
import { Button, Input, message, Form, Typography } from "antd";

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

  return (
    <div style={styles.container}>
      <Form onFinish={handleSubmit} layout="vertical" style={styles.form}>
        <Title level={2} style={styles.title}>
          Login
        </Title>
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
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
  },
  form: {
    maxWidth: "400px",
    width: "100%",
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
  },
};

export default ShopLogin;
