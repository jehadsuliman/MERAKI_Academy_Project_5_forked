import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Card, Typography } from "antd";
import {
  setLogin,
  setUserId,
  setLogout,
} from "../../Service/api/redux/reducers/auth/userAuth";

const { Title, Paragraph } = Typography;

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    message.success("You have been logged out successfully.");
    navigate("/home");
  };

  return (
    <Card
      style={{
        width: 400,
        margin: "50px auto",
        textAlign: "center",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2}>Logout</Title>
      <Paragraph>
        Are you sure you want to log out?
      </Paragraph>
      <Button
        type="primary"
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          fontSize: "16px",
          width: "100%",
        }}
      >
        Logout
      </Button>
    </Card>
  );
};

export default Logout;
