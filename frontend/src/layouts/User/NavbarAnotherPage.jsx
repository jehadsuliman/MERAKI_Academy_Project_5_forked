import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
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
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const NavbarAnotherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

 

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return null;

  const menu = (
    <Menu>
      {!isLoggedIn ? (
        <>
          <Menu.Item
            key="registerUser"
            icon={<LoginOutlined />}
            onClick={() => navigate("/RegisterUserOrAdmin")}
          >
            Sign up User
          </Menu.Item>
          <Menu.Item
            key="loginWithUserOrAdmin"
            icon={<UserAddOutlined />}
            onClick={() => navigate("/LoginUserOrAdmin")}
          >
            Login user
          </Menu.Item>
          <Menu.Item
            key="registerShop"
            icon={<LoginOutlined />}
            onClick={() => navigate("/shopRegister")}
          >
            Sign up Shop
          </Menu.Item>
          <Menu.Item
            key="loginWithShop"
            icon={<ShopOutlined />}
            onClick={() => navigate("/shopLogin")}
          >
            Login shop
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="userProfile"
            icon={<EditOutlined />}
            onClick={() => navigate("/userProfile")}
          >
            Edit Profile
          </Menu.Item>
          <Menu.Item
            key="order"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/order")}
          >
            Order
          </Menu.Item>
          <Menu.Item
            key="logoutUser"
            icon={<LogoutOutlined />}
            onClick={() => navigate("/logoutUser")}
          >
            Logout user
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between">
        <span className="fw-bold fs-2" onClick={() => navigate("/")}>JKI EXPRESS</span>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "24px",
            alignItems: "center",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <UserOutlined />
            </a>
          </Dropdown>
          <ShoppingCartOutlined onClick={() => navigate("/carts")} />
          <HeartOutlined onClick={() => navigate("/favorite")} />
          <MessageOutlined onClick={() => navigate("/faq")} />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarAnotherPage;
