import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          padding: "40px 0",
        }}
      >
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <h4>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <h4>Contact Information</h4>
            <p>Email: jki@gmail.com.com</p>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <h4>Follow Us</h4>
            <div style={{ fontSize: "24px" }}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined style={{ margin: "0 10px" }} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterOutlined style={{ margin: "0 10px" }} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined style={{ margin: "0 10px" }} />
              </a>
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: "30px" }}>
          JKI EXPRESS ©{new Date().getFullYear()} Created by JKI Team
        </div>
      </Footer>
    </Layout>
  );
};

export default FooterComponent;
