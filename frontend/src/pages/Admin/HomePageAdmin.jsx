import React, { useState } from 'react';
import ShopsList from "../../layouts/Admin/ShopsList"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  HomeOutlined ,
  ShopOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content,Footer } = Layout;
const { SubMenu } = Menu; 
const HomePageAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
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
          defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<ShopOutlined />}
            title="Product"
          >
            <Menu.Item key="2">Add Product</Menu.Item>
            <Menu.Item key="3">View Products</Menu.Item>
            <Menu.Item key="4">Edit Product</Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
            User
          </Menu.Item>
          <Menu.Item key="6" icon={<ShopOutlined />} >
            Shop
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 10px',
            padding: 2,
            minHeight: 300,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <ShopsList/>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          JKI EXPRESS ©{new Date().getFullYear()} Created by JKI Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePageAdmin;