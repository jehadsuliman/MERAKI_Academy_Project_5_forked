import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Card,
  Space,
  Typography,
  Divider,
  Avatar,
  Row,
  Col,
  List,
  Modal,
  Button,
  Form,
  Input,
  message,
} from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ProfileShop = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const [shopInfo, setShopInfo] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken || !shopId) {
      setError("You need to log in to access this page");
      setLoading(false);
      return;
    }

    const fetchShopInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/shops/${shopId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setShopInfo(response.data.result);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Please ensure you are logged in");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/subcategories/shop/${shopId}`
        );
        if (response.data.success) {
          setSubCategories(response.data.subCategories || []);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Please ensure you are logged in");
      }
    };

    fetchShopInfo();
    fetchSubCategories();
  }, [authToken, shopId]);

  useEffect(() => {
    if (selectedSubCategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/products/subcategory/${selectedSubCategory}`
          );
          if (response.data.success) {
            setProducts(response.data.product || []);
          } else {
            console.error(response.data.message);
          }
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };

      fetchProducts();
    }
  }, [selectedSubCategory]);

  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.put(
        `http://localhost:5000/products/${selectedProduct.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Product updated successfully");
        setIsModalVisible(false);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, ...values }
              : product
          )
        );
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Product deleted successfully");
        setIsModalVisible(false);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct.id)
        );
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleDeleteSubCategories = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/subcategories/shop/${shopId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Subcategories deleted successfully");
        setSubCategories([]);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete subcategories");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  return (
    <Card style={{ padding: "20px" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              src={shopInfo.profile_pic}
              style={{
                width: "170px",
                height: "170px",
                objectFit: "cover",
              }}
              shape="circle"
            />
          </Col>
          <Col xs={24} sm={12} md={16} lg={18} xl={19}>
            <Title level={2} style={{ marginBottom: "16px" }}>
              {shopInfo.shopname}
            </Title>
            <Text strong>Description:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shopInfo.discreption
                ? shopInfo.discreption
                : "No description available"}
            </Text>
            <Divider />
            <Text strong>Country:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shopInfo.country}
            </Text>
            <Divider />
            <Text strong>Email:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shopInfo.email}
            </Text>
            <Divider />
            <Text strong>Phone Number:</Text>
            <Text>{shopInfo.phone_number || "Not provided"}</Text>
          </Col>
        </Row>
        <Divider />
        <Title level={3}>My Sub Categories</Title>
        {subCategories.length > 0 ? (
          <Space size={16} wrap>
            {subCategories.map((subCategory) => (
              <Card
                key={subCategory.id}
                style={{
                  width: 300,
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                }}
                onClick={() => handleSubCategoryClick(subCategory.id)}
              >
                <Card.Meta
                  avatar={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                  title={subCategory.description}
                />
              </Card>
            ))}
          </Space>
        ) : (
          <Text>No sub-categories found.</Text>
        )}
        {selectedSubCategory && (
          <>
            <Divider />
            <Title level={3}>My Products in Sub-Category</Title>
            {products.length > 0 ? (
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={products}
                renderItem={(product) => (
                  <List.Item>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={product.name}
                          src={product.image}
                          onClick={() => handleProductClick(product)}
                        />
                      }
                    >
                      <Card.Meta
                        title={product.name}
                        description={
                          <>
                            <Text strong>Title:</Text> {product.title}
                            <br />
                            <Text strong>Description:</Text>{" "}
                            {product.description}
                            <br />
                            <Text strong>Price:</Text> ${product.price}
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <Text>No products found in this sub-category.</Text>
            )}
          </>
        )}
      </Space>

      <Modal
        title="Product Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="delete" type="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>,
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Update
          </Button>,
        ]}
      >
        {selectedProduct && (
          <Form
            form={form}
            initialValues={selectedProduct}
            layout="vertical"
            onFinish={handleModalOk}
          >
            <Form.Item
              name="image"
              label="Image URL"
              rules={[
                { required: true, message: "Please input the image URL!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" />
            </Form.Item>
            
          </Form>
        )}
      </Modal>
    </Card>
  );
};

export default ProfileShop;
