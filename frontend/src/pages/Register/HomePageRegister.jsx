import React from "react";
import { Button, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const HomePageRegister = () => {
  const navigate = useNavigate();

  const handleRegisterUser = () => {
    navigate("/RegisterUserOrAdmin");
  };

  const handleRegisterShop = () => {
    navigate("/shopRegister");
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={styles.title}>
          Sign up
        </Title>
        <Space direction="vertical" size="large" style={styles.space}>
          <Button type="primary" size="large" onClick={handleRegisterUser}>
            Sign Up as a User
          </Button>
          <Button type="default" size="large" onClick={handleRegisterShop}>
            Sign Up as a Shop
          </Button>
        </Space>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    padding: "32px",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  title: {
    marginBottom: "24px",
    fontWeight: 700,
  },
  space: {
    width: "100%",
  },
};

export default HomePageRegister;
