import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, message, Form, Card, Row, Col } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Flag from "react-flagkit";
import CountryList from "country-list";

const { Option } = Select;

const RegisterUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(0);
  const [role_id, setRole_id] = useState("");
  const navigate = useNavigate();

  const addNewUser = async () => {
    const userData = {
      userName,
      email,
      password,
      country,
      age,
      phoneNumber,
      role_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        userData
      );
      message.success("User registered successfully!");
      navigate("/LoginUserOrAdmin");
    } catch (err) {
      message.error("Registration failed. Please try again.");
    }
  };

  const countries = CountryList.getData();

  return (
    <div style={styles.container}>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
          <Card
            bordered={false}
            style={styles.card}
            title={<h3 style={styles.title}>Register User</h3>}
          >
            <Form layout="vertical" onFinish={addNewUser} style={styles.form}>
              <Form.Item
                label="User Name"
                name="userName"
                rules={[
                  { required: true, message: "Please input your user name!" },
                ]}
              >
                <Input
                  placeholder="User Name"
                  onChange={(e) => setUserName(e.target.value)}
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
                  placeholder="Select a country"
                  onChange={(value) => setCountry(value)}
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
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <Input
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(Number(e.target.value))}
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role_id"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select
                  placeholder="Select a role"
                  onChange={(value) => setRole_id(value)}
                  style={styles.input}
                >
                  <Option value="1">Admin</Option>
                  <Option value="2">User</Option>
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
                  <Link to="/LoginUserOrAdmin">Login here</Link>
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
    height: "130vh",
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

export default RegisterUser;
