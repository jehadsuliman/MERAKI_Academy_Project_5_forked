import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinFilled,
  MailOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#000000",
          padding: "30px 0",
          color: "#fff",
        }}
      >
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <h4 style={{ color: "#fff" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="#home" style={{ color: "#FFA07A" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" style={{ color: "#FFA07A" }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" style={{ color: "#FFA07A" }}>
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/LoginUserOrAdmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFA07A" }}
                >
                  Login User
                </a>
              </li>
              <li>
                <a
                  href="/shopLogin"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFA07A" }}
                >
                  Login Shop
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
              Our Team
            </h4>
            <div
              style={{ fontSize: "18px", color: "#FFA07A", lineHeight: "1.6" }}
            >
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                Jehad Suliman
                <a
                  href="https://www.linkedin.com/in/jehadsuliman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0A66C2", marginLeft: "10px" }}
                >
                  <LinkedinFilled />
                </a>
              </p>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                Khaled Odeh
                <a
                  href="https://www.linkedin.com/in/khaledodehh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0A66C2", marginLeft: "10px" }}
                >
                  <LinkedinFilled />
                </a>
              </p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 style={{ color: "#fff" }}>Follow Us</h4>
            <div style={{ fontSize: "24px" }}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877F2", margin: "0 10px" }}
              >
                <FacebookOutlined />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C13584", margin: "0 10px" }}
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1DA1F2", margin: "0 10px" }}
              >
                <TwitterOutlined />
              </a>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <h4 style={{ color: "#fff" }}>Contact Information</h4>
            <p style={{ color: "#FFA07A" }}>
              <MailOutlined style={{ marginRight: "8px" }} />
              jki@gmail.com
            </p>
          </Col>
        </Row>

        <div style={{ marginTop: "30px", color: "#FFD700" }}>
          JKI EXPRESS ©{new Date().getFullYear()} Created by JKI Team
        </div>
      </Footer>
    </Layout>
  );
};

export default FooterComponent;
