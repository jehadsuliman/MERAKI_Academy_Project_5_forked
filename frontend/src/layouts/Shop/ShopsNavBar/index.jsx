import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  EditOutlined,
  LoginOutlined,
  HomeOutlined,
  ShopOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const [collapsed, setCollapsed] = useState(false);
  const [goToPage, setGoToPage] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  if (goToPage) {
    navigate(goToPage);
    setGoToPage("");
    return null;
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          triggerSubMenuAction="hover"
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/">Dashboard</NavLink>
          </Menu.Item>

          <SubMenu key="sub2" icon={<ShopOutlined />} title="Category">
            <Menu.Item
              key="4"
              onClick={() => setGoToPage("/createSubCategory")}
            >
              Create Sub Category
            </Menu.Item>

            <Menu.Item key="sub3" onClick={() => setGoToPage("/categories")}>
              Sub Category
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="2"
            icon={<PlusOutlined />}
            onClick={() => setGoToPage("/products")}
          >
            Add Product
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={<EditOutlined />}
            onClick={() => setGoToPage(`/shopUpdate/${shopId}`)}
          >
            Update User Shop
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<UserAddOutlined />}
            onClick={() => setGoToPage("/shopRegister")}
          >
            Register
          </Menu.Item>

          <Menu.Item
            key="8"
            icon={<LoginOutlined />}
            onClick={() => setGoToPage("/shopLogin")}
          >
            Login
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 10px",
            padding: 2,
            minHeight: 300,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        ></Content>
        <Footer style={{ textAlign: "center" }}>
          JKI EXPRESS ©{new Date().getFullYear()} Created by JKI Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
