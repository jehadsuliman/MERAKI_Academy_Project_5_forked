import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Spin,
  message,
  Select,
  Upload,
} from "antd";
import CountryList from "country-list";
import Flag from "react-flagkit";
import { InboxOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const UpdateShop = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const authToken = useSelector((state) => state.shopAuth.token);
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    shopname: "",
    country: "",
    description: "",
    email: "",
    password: "",
    category_id: "",
    profile_pic: "",
    phone_number: "",
  });
  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const countries = CountryList.getData();
  const countryCodeMap = Object.fromEntries(
    countries.map(({ code, name }) => [name.toLowerCase(), code])
  );

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

  const handleCountryChange = (value) => {
    setShop({ ...shop, country: value });
  };

  const countryCode = countryCodeMap[shop.country.toLowerCase()] || "";

  const uploadPreset = "khaledOdehCloud";

  const props = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: uploadPreset,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const imageUrl = info.file.response.url;
        setShop((prevShop) => ({
          ...prevShop,
          profile_pic: imageUrl,
        }));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        width: "500px",
      }}
    >
      <Title level={2}>Update Shop</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Card title="Shop Details" style={{ marginBottom: "20px" }}>
        <p>
          <strong>Profile Picture:</strong> <br />
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
          <strong>Country:</strong>{" "}
          {countryCode ? (
            <>
              <Flag country={countryCode} style={{ marginRight: "8px" }} />
              {shop.country}
            </>
          ) : (
            shop.country
          )}
        </p>
        <p>
          <strong>Email:</strong> {shop.email}
        </p>
        <p>
          <strong>Description:</strong> {shop.description}
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
            <Form.Item label="Shop Name" name="shopname">
              <Input />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select
                name="country"
                value={shop.country}
                onChange={handleCountryChange}
                placeholder="Select a country"
              >
                {countries.map((country) => (
                  <Option key={country.code} value={country.name.toLowerCase()}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Flag
                        country={country.code}
                        style={{ marginRight: "8px" }}
                      />{" "}
                      {country.name}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>

            <Form.Item label="Phone Number" name="phone_number">
              <Input />
            </Form.Item>
            <Form.Item label="Profile Picture" name="profile_pic">
              <Dragger {...props} style={{ marginTop: "16px" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
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
