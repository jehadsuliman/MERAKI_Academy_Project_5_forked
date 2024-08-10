import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu,message } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  MessageOutlined,
  LoginOutlined,
  ShopOutlined,
  UserAddOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import { setLogout } from "../../Service/api/redux/reducers/auth/userAuth";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

  const search = (searchTerm) => {
    const filter = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setProducts(filter));
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return null;

  const menu = (
    <Menu style={{ backgroundColor: "#000" }}>
      {!isLoggedIn ? (
        <>
          <Menu.Item
            key="registerUser"
            icon={<LoginOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/RegisterUserOrAdmin")}
            style={{ color: "#fff" }}
          >
            Sign up User
          </Menu.Item>
          <Menu.Item
            key="loginWithUserOrAdmin"
            icon={<UserAddOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/LoginUserOrAdmin")}
            style={{ color: "#fff" }}
          >
            Login user
          </Menu.Item>
          <Menu.Item
            key="registerShop"
            icon={<LoginOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/shopRegister")}
            style={{ color: "#fff" }}
          >
            Sign up Shop
          </Menu.Item>
          <Menu.Item
            key="loginWithShop"
            icon={<ShopOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/shopLogin")}
            style={{ color: "#fff" }}
          >
            Login shop
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="userProfile"
            icon={<EditOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/userProfile")}
            style={{ color: "#fff" }}
          >
            Edit Profile
          </Menu.Item>
          <Menu.Item
            key="order"
            icon={<ShoppingCartOutlined style={{ color: "#fff" }} />}
            onClick={() => navigate("/order")}
            style={{ color: "#fff" }}
          >
            Order
          </Menu.Item>
          <Menu.Item
            key="logoutUser"
            icon={<LogoutOutlined style={{ color: "#fff" }} />}
            onClick={() => {
              dispatch(setLogout());
              message.success("User Logout successfully!");

              navigate("/")}}
            style={{ color: "#fff" }}
          >
            Logout user
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Navbar
      expand="lg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "#000",
      }}
    >
      <Container className="d-flex justify-content-between">
        <span
          className="fw-bold fs-2"
          style={{ color: "#fff", cursor: "pointer"}}
          onClick={() => navigate("/")}
        >
          JKI <span style={{ color: "#FFA07A" }}>E</span>XPRESS
        </span>
        <InputGroup size="sm" className="w-50">
          <Form.Control
            aria-label="Search"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
          />
        </InputGroup>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "24px",
            alignItems: "center",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <UserOutlined style={{ color: "#fff" }} />
            </a>
          </Dropdown>
          <ShoppingCartOutlined
            style={{ color: "#fff" }}
            onClick={() => navigate("/carts")}
          />
          <HeartOutlined
            style={{ color: "#fff" }}
            onClick={() => navigate("/favorite")}
          />
          <MessageOutlined
            style={{ color: "#fff" }}
            onClick={() => navigate("/faq")}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
