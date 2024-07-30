import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";
import { Button, Input, message, Form } from "antd";

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

  const handleSubmit = async (e) => {
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
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      style={{ margin: "60px", paddingLeft: "50px", paddingRight: "50px" }}
    >
      <h2>Login Shop</h2>
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
  );
};

export default ShopLogin;
