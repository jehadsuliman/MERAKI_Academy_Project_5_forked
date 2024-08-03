import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, Form, Input, Typography, Spin, message } from "antd";

const { Title } = Typography;

const UpdateShop = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const authToken = useSelector((state) => state.shopAuth.token);
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    shopname: "",
    country: "",
    discreption: "",
    email: "",
    password: "",
    category_id: "",
    profile_pic: "",
    phone_number: "",
  });

  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId && authToken) {
      const fetchShop = async () => {
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
            setShop(response.data.result);
          } else {
            setError("Shop data not found");
          }
        } catch (error) {
          setError("Please ensure you are logged in");
        } finally {
          setLoading(false);
        }
      };

      fetchShop();
    } else {
      setError("Please ensure you are logged in");
      setLoading(false);
    }
  }, [shopId, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleSubmit = async (values) => {
    if (!authToken) {
      setError("Please ensure you are logged in");
      return;
    }

    try {
      const { password, ...updatedShopData } = values;
      const response = await axios.put(
        `http://localhost:5000/shops/${shopId}`,
        updatedShopData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        message.success("Shop updated successfully");
        navigate("/shop");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Please ensure you are logged in");
    }
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Title level={2}>Update Shop</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Card title="Shop Details" style={{ marginBottom: "20px" }}>
        <p>
          <strong>Profile Picture:</strong> <br></br>
          <img
            src={shop.profile_pic}
            alt="Profile"
            style={{ width: "200px", height: "200px" }}
          />
        </p>
        <p>
          <strong>Shop Name:</strong> {shop.shopname}
        </p>
        <p>
          <strong>Country:</strong> {shop.country}
        </p>
        <p>
          <strong>Email:</strong> {shop.email}
        </p>
        <p>
          <strong>Description:</strong> {shop.discreption}
        </p>

        <p>
          <strong>Phone Number:</strong> {shop.phone_number}
        </p>
        <Button type="primary" onClick={() => setShowUpdate(true)}>
          Edit
        </Button>
      </Card>

      {showUpdate && (
        <Card title="Update Shop" style={{ width: "100%" }}>
          <Form layout="vertical" onFinish={handleSubmit} initialValues={shop}>
          <Form.Item label="Profile Picture" name="profile_pic">
              <Input />
            </Form.Item>
            <Form.Item label="Shop Name" name="shopname">
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Description" name="discreption">
              <Input />
            </Form.Item>

            <Form.Item label="Phone Number" name="phone_number">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Shop
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default UpdateShop;
