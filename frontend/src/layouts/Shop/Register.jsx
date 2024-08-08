import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Select, message, Form, Card, Row, Col } from "antd";
import CountryList from "country-list";
import Flag from "react-flagkit";

const { Option } = Select;

const RegisterShop = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shopname: "",
    country: "",
    phone_number: "",
    email: "",
    description: "",
    password: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const countries = CountryList.getData();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, category_id: value });
    const selectedCategory = categories.find(
      (category) => category.id === value
    );
    setSelectedCategoryName(selectedCategory ? selectedCategory.name : "");
  };

  const handleCountryChange = (value) => {
    setForm({ ...form, country: value });
  };

  const handleSubmit = async (values) => {
    if (
      !form.shopname ||
      !form.country ||
      !form.phone_number ||
      !form.email ||
      !form.password ||
      !form.category_id
    ) {
      message.error("Please fill in all fields.");
      return;
    }

    const dataToSend = {
      ...form,
      role_id: 3,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/shops/register",
        dataToSend
      );
      if (response.data.success) {
        message.success("Shop registered successfully!");
        navigate("/shopLogin");
      } else {
        message.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      message.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    }
  };

  return (
    <div style={styles.container}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
          <Card
            bordered={false}
            style={styles.card}
            title={<h3 style={styles.title}>Register Shop</h3>}
          >
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={form}
              style={styles.form}
            >
              <Form.Item
                label="Shop Name"
                name="shopname"
                rules={[
                  { required: true, message: "Please input your shop name!" },
                ]}
              >
                <Input
                  name="shopname"
                  onChange={handleChange}
                  placeholder="Shop Name"
                  style={styles.input}
                />
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
                  value={form.country}
                  onChange={handleCountryChange}
                  placeholder="Select a country"
                  style={styles.input}
                >
                  {countries.map((country) => (
                    <Option key={country.code} value={country.name}>
                      <div style={styles.countryOption}>
                        <Flag country={country.code} style={styles.flag} />{" "}
                        {country.name}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  name="phone_number"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category_id"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleCategoryChange}
                  placeholder="Select a category"
                  style={styles.input}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={styles.button}>
                  Sign up
                </Button>
              </Form.Item>

              <Form.Item>
                <div style={styles.loginPrompt}>
                  Already have an account?{" "}
                  <Link to="/shopLogin">Login here</Link>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "140vh",
    background: "linear-gradient(135deg, #f0f2f5, #e6f7ff)",
  },
  card: {
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    padding: "20px",
    width: "500px",
    maxWidth: "500px",
    boxSizing: "border-box",
    marginRight: "250px",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: 600,
    fontSize: "24px",
  },
  form: {
    margin: "0 auto",
  },
  input: {
    height: "40px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    height: "40px",
  },
};

export default RegisterShop;
