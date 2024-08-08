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
  Upload,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CountryList from "country-list";
import Flag from "react-flagkit";

const { Dragger } = Upload;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const countries = CountryList.getData();
  const countryCodeMap = Object.fromEntries(
    countries.map(({ code, name }) => [name.toLowerCase(), code])
  );

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
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const { image, ...productData } = values;

      const response = await axios.put(
        `http://localhost:5000/products/${selectedProduct.id}`,
        { ...productData, image },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        message.success("Product updated successfully");
        setIsModalOpen(false);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id
              ? { ...product, ...productData, image }
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
    setIsModalOpen(false);
  };

  const handleDeleteProduct = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
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
            setIsModalOpen(false);
            setProducts((prevProducts) =>
              prevProducts.filter(
                (product) => product.id !== selectedProduct.id
              )
            );
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          message.error("Failed to delete product");
        }
      },
    });
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this sub-category?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          const response = await axios.delete(
            `http://localhost:5000/subcategories/${subCategoryId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            message.success("Sub-category deleted successfully");
            setSubCategories((prevSubCategories) =>
              prevSubCategories.filter(
                (subCategory) => subCategory.id !== subCategoryId
              )
            );
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          message.error("Failed to delete sub-category");
        }
      },
    });
  };

  const shop = shopInfo || {};
  const countryCode = countryCodeMap[shop.country?.toLowerCase()] || "";

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
        {error}
      </p>
    );

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: "khaledOdehCloud",
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        form.setFieldsValue({ image: info.file.response.url });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    showUploadList: false,
  };

  return (
    <Card style={{ padding: "20px" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} xl={5}>
            <Avatar
              size={150}
              icon={<UserOutlined />}
              src={shop.profile_pic}
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
              {shop.shopname}
            </Title>
            <Text strong>Description:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shop.description || "No description available"}
            </Text>

            <Divider />

            <Text strong>
              Country:{<br />}
              {countryCode ? (
                <>
                  <Flag country={countryCode} style={{ marginRight: "8px" }} />
                  {shop.country}
                </>
              ) : (
                shop.country
              )}
            </Text>

            <Divider />
            <Text strong>Email:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shop.email}
            </Text>

            <Divider />
            <Text strong>Phone Number:</Text>
            <Text style={{ display: "block", marginBottom: "16px" }}>
              {shop.phone_number}
            </Text>
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
                  position: "relative",
                }}
                onClick={() => handleSubCategoryClick(subCategory.id)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ShoppingCartOutlined
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                    <Title level={5} style={{ margin: 0 }}>
                      {subCategory.description}
                    </Title>
                  </div>
                  <Button
                    type="default"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSubCategory(subCategory.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
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
                          style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover",
                          }}
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
                            <Text strong>Product Name:</Text>
                            <br /> {product.title}
                            <br />
                            <Text strong>Description:</Text>
                            <br /> {product.description}
                            <br />
                            <Text strong>Price:</Text>
                            <br /> ${product.price}
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <Text>No products found.</Text>
            )}
          </>
        )}
      </Space>

      <Modal
        title="Update Product"
        open={isModalOpen} // Use `open` instead of `visible`
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="delete" type="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Save
          </Button>,
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={selectedProduct}>
          <Form.Item
            name="title"
            label="Product Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Product Description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Product Picture" name="image">
            <Dragger {...uploadProps} style={{ marginTop: "16px" }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProfileShop;
