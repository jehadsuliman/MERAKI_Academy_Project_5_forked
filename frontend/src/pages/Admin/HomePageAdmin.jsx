import React, { useState } from 'react';
import ShopsList from "../../layouts/Admin/ShopsList"
import UsersList from "../../layouts/Admin/UsersList"
import AddCategory from '../../layouts/Admin/AddCategory';
import CategoriesList from '../../layouts/Admin/CategoriesList';
import LogoutAdmin from '../../layouts/Admin/LogoutAdmin';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  HomeOutlined ,
  ShopOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content,Footer } = Layout;
const { SubMenu } = Menu; 
const HomePageAdmin = () => {
  const [goToPageS, setGoToPage] = useState("");

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
            title="Categories"
          >
            <Menu.Item key="2" onClick={()=>{setGoToPage("AddCategory")}}>Add Category</Menu.Item>
            <Menu.Item key="3" onClick={()=>{setGoToPage("ViewCategory")}}>View Categories</Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<UsergroupAddOutlined />}  onClick={()=>{setGoToPage("UsersList")}}>
            User
          </Menu.Item>
          <Menu.Item key="6" icon={<ShopOutlined />} onClick={()=>{setGoToPage("ShopsList")}}>
            Shop
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />} onClick={() => setGoToPage("LogoutAdmin")}>
            Logout
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
        {goToPageS==="ShopsList"&&<ShopsList/>} 
        {goToPageS==="AddCategory"&&<AddCategory/>} 
        {goToPageS==="UsersList"&&<UsersList/>} 
        {goToPageS==="ViewCategory"&&<CategoriesList/>} 
        {goToPageS==="LogoutAdmin" && <LogoutAdmin />}

         
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
