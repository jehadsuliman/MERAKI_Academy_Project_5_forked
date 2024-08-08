import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Card,
  Space,
  Typography,
  Divider,
  Avatar,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Input,
  message,
  Upload,
  Select,
  Spin,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CountryList from "country-list";
import Flag from "react-flagkit";

const { Title, Text } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const UserProfile = () => {
  const authToken = useSelector((state) => state.userAuth.token);
  const userId = useSelector((state) => state.userAuth.userId);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone_number: "",
    age: "",
    country: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const countries = CountryList.getData();
  const countryCodeMap = Object.fromEntries(
    countries.map(({ code, name }) => [name.toLowerCase(), code])
  );

  useEffect(() => {
    if (authToken && userId) {
      const fetchUser = async () => {
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
            setUserInfo(response.data.result);
            form.setFieldsValue(response.data.result);
          } else {
            setError("User data not found");
          }
        } catch (error) {
          setError("Please ensure you are logged in");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setError("Please ensure you are logged in");
      setLoading(false);
    }
  }, [userId, authToken]);

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    if (!authToken) {
      setError("Please ensure you are logged in");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        message.success("Profile updated successfully");
        setUserInfo({ ...userInfo, ...values });
        setShowUpdate(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Please ensure you are logged in");
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: "khaledOdehCloud",
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUserInfo((prevUser) => ({
          ...prevUser,
          profile_pic: info.file.response.url,
        }));
        form.setFieldsValue({ profile_pic: info.file.response.url });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const countryCode = countryCodeMap[userInfo.country.toLowerCase()] || "";

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  return (
    <Card style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Row gutter={16} justify="center" align="top">
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              src={userInfo.profile_pic}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "24px",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={16} lg={18} xl={19}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              {userInfo.username}
            </Title>
            <Divider />
            <Text strong>
              Country:{<br />}
              {countryCode ? (
                <>
                  <Flag country={countryCode} style={{ marginRight: "8px" }} />
                  {userInfo.country}
                </>
              ) : (
                userInfo.country
              )}
            </Text>
            <Divider />
            <Text strong>Email:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {userInfo.email}
            </Text>
            <Divider />
            <Text strong>Phone Number:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {userInfo.phone_number}
            </Text>
            <Divider />
            <Text strong>Age:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {userInfo.age}
            </Text>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setShowUpdate(true)}
              style={{ marginRight: "8px" }}
            >
              Edit Profile
            </Button>
            <Button
              type="default"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/")}
              style={{ marginBottom: "16px" }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Space>

      <Modal
        title="Update Profile"
        visible={showUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setShowUpdate(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
          <Button key="cancel" onClick={() => setShowUpdate(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Select a country" style={{ width: "100%" }}>
              {countries.map((country) => (
                <Option key={country.code} value={country.name.toLowerCase()}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Flag
                      country={country.code}
                      style={{ marginRight: "8px" }}
                    />
                    {country.name}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phone Number" name="phone_number">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Profile Picture" name="profile_pic">
            <Dragger {...uploadProps} style={{ marginTop: "16px" }}>
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
        </Form>
      </Modal>
    </Card>
  );
};

export default UserProfile;
