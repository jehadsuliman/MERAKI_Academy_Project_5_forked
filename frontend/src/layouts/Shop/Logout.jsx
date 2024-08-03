import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Spin, Card, Typography } from "antd";
import axios from "axios";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";

const { Title, Paragraph } = Typography;

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const authToken = useSelector((state) => state.shopAuth.token);

  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shopId && authToken) {
      const fetchShopName = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/shops/${shopId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data && response.data.result) {
            setShopName(response.data.result.shopname);
          } else {
            setError("Shop data not found");
          }
        } catch (error) {
          setError("You are already logged out");
        } finally {
          setLoading(false);
        }
      };

      fetchShopName();
    } else {
      setError("You are already logged out");
      setLoading(false);
    }
  }, [shopId, authToken]);

  const handleLogout = () => {
    dispatch(setLogin(null));
    dispatch(setShopId(null));
    message.success("You have been logged out successfully.");
    navigate("/home");
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return <p style={{ color: "red", textAlign: "center", fontSize: '20px'  }}>{error}</p>;

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
      {shopName && (
        <Paragraph>Are you sure you want to log out?<br></br>
          You are logged in as:<br></br> <strong>{shopName}</strong>
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

export default Logout;
