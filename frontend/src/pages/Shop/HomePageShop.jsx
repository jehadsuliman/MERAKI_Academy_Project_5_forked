import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditOutlined,
  ShopOutlined,
  PlusOutlined,
  ProductOutlined,
  AlignLeftOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import SubCategoryList from "../../layouts/Shop/SubCategoryList";
import CreateSubCategory from "../../layouts/Shop/CreateSubCategory";
import Products from "../../layouts/Shop/CreateProduct";
import ShopUpdate from "../../layouts/Shop/UpdateShop";
import ProductList from "../../layouts/Shop/GetAllProduct";
import ProfileShop from "../../layouts/Shop/ProfileShop";
import Logout from "../../layouts/Shop/Logout";
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const HomePageShop = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const [collapsed, setCollapsed] = useState(false);
  const [goToPage, setGoToPage] = useState("ProfileShop");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => setGoToPage(`ProfileShop`)}
          >
            My Profile
          </Menu.Item>

          <SubMenu key="sub1" icon={<ShopOutlined />} title="Category">
            <Menu.Item
              key="2"
              icon={<PlusOutlined />}
              onClick={() => setGoToPage("createSubCategory")}
            >
              Create Sub Category
            </Menu.Item>

            <Menu.Item
              key="3"
              icon={<AlignLeftOutlined />}
              onClick={() => setGoToPage("categories")}
            >
              Sub Category
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<ProductOutlined />} title="Products">
            <Menu.Item
              key="4"
              icon={<PlusOutlined />}
              onClick={() => setGoToPage("Products")}
            >
              Add Product
            </Menu.Item>

            <Menu.Item
              key="5"
              icon={<AlignLeftOutlined />}
              onClick={() => setGoToPage("ProductList")}
            >
              All products
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="6"
            icon={<EditOutlined />}
            onClick={() => setGoToPage(`ShopUpdate`)}
          >
            Update User Shop
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={<LogoutOutlined />}
            onClick={() => setGoToPage("logout")}
          >
            Logout
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
        >

 {goToPage === "categories" && <SubCategoryList />}
        {goToPage === "createSubCategory" && <CreateSubCategory />}
        {goToPage === "Products" && <Products />}
        {goToPage === "ShopUpdate" && <ShopUpdate />}
        {goToPage === "ProductList" && <ProductList />}
        {goToPage === "ProfileShop" && <ProfileShop />}
        {goToPage === "logout" && <Logout />}

        </Content>

        <Footer style={{ textAlign: "center" }}>
          JKI EXPRESS ©{new Date().getFullYear()} Created by JKI Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePageShop;
