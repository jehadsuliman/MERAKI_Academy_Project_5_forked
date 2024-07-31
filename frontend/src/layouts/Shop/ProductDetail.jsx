import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setProductId,
  deleteProductById,
} from "../../Service/api/redux/reducers/shop/product";
import {
  Button,
  Modal,
  Form,
  Input,
  notification,
  Card,
  Typography,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { productId } = useParams();
  const authToken = useSelector((state) => state.shopAuth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(setProductId(productId));
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/products/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data.success) {
            setProduct(response.data.product[0]);
            setFormData(response.data.product[0]);
          } else {
            setError(response.data.message);
          }
        } catch (error) {
          setError("Failed to fetch product details");
        }
      };

      fetchProduct();
    } else {
      setError("Product ID is not available");
    }
  }, [productId, authToken, dispatch]);

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${productId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        setProduct(response.data.product[0]);
        setFormData(response.data.product[0]);
        navigate(`/shop`);
        notification.success({
          message: "Product Updated",
          description: "The product was updated successfully.",
        });
      } else {
        setError(response.data.message);
        notification.error({
          message: "Update Failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      setError("Failed to update product");
      notification.error({
        message: "Update Failed",
        description: "Failed to update product.",
      });
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action will delete the product permanently.",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          dispatch(deleteProductById(productId));
          navigate(`/shop`);
          notification.success({
            message: "Product Deleted",
            description: "The product was deleted successfully.",
          });
        } catch (error) {
          setError("Failed to delete product");
        }
      },
    });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Title level={2}>Product Details</Title>
      {error && <Text type="danger">{error}</Text>}
      {product ? (
        <Card>
          <Row gutter={16} style={{ alignItems: "center" }}>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                alt={product.title}
                src={product.image}
                style={{
                  height: "300px",
                  width: "auto",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setShowDetailsModal(true)}
              />
            </Col>
            <Col span={12}>
              <div style={{ paddingLeft: "16px" }}>
                <Title level={4}>{product.title}</Title>
                <Text strong>Description:</Text>
                <p>{product.description}</p>
                <Text strong>Price:</Text>
                <p>${product.price}</p>
                <div style={{ marginTop: "16px" }}>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Text>Loading...</Text>
      )}

      <Modal
        title={product?.title}
        visible={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
        centered
      >
        <Card
          cover={
            <img
              alt={product?.title}
              src={product?.image}
              style={{ width: "100%" }}
            />
          }
        >
          <Card.Meta
            title={product?.title}
            description={
              <>
                <Text strong>Description:</Text> {product?.description}
                <br />
                <Text strong>Price:</Text> ${product?.price}
              </>
            }
          />
        </Card>
      </Modal>

      <Modal
        title="Edit Product"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        centered
      >
        <Form
          initialValues={formData}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the product title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input the product image URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDetail;
