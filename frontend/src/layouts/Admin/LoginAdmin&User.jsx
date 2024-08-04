import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setLogin,
  setUserId,
} from "../../Service/api/redux/reducers/auth/userAuth";
import { Button, Input, message, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values
      );

      if (response.data.success) {
        dispatch(setLogin(response.data.token));
        dispatch(setUserId(response.data.userId));

        const role = response.data.role;

        if (role === 1) {
          navigate("/admin");
        } else if (role === 2) {
          navigate("/");
        }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default Login;
