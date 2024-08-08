import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Spin, Card, Typography } from "antd";
import axios from "axios";
import { setLogout } from "../../Service/api/redux/reducers/auth/userAuth";

const { Title, Paragraph } = Typography;

const LogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userAuth.userId);
  const authToken = useSelector((state) => state.userAuth.token);

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId && authToken) {
      const fetchUserName = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data && response.data.result) {
            setUserName(response.data.result.username);
          } else {
            setError("User data not found");
          }
        } catch (error) {
          setError("You are already logged out");
        } finally {
          setLoading(false);
        }
      };

      fetchUserName();
    } else {
      setError("You are already logged out");
      setLoading(false);
    }
  }, [userId, authToken]);

  const handleLogout = () => {
    dispatch(setLogout());
    message.success("You have been logged out successfully.");
    navigate("/");
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  return (
    <Card
      style={{
        width: 300,
        margin: "0 auto",
        marginTop: "25px",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Title level={3}>Logout</Title>
      {userName && (
        <Paragraph>
          Are you sure you want to log out?
          <br />
          You are logged in as:
          <br /> <strong>{userName}</strong>
        </Paragraph>
      )}
      <Button
        type="primary"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </Card>
  );
};

export default LogoutUser;
