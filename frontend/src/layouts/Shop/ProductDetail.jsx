import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSubCategoryId } from "../../Service/api/redux/reducers/shop/subCategoriesSlice";
import {
  setProducts,
  updateProductById,
  deleteProductById,
} from "../../Service/api/redux/reducers/shop/product";
import { Button, Modal, Form, Input, notification } from "antd";

const ProductDetail = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
  }, [productId, authToken]);

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
        dispatch(updateProductById(response.data.product));
        dispatch(setSubCategoryId(product.subCategoryId));
        navigate(`/`);
        notification.success({
          message: 'Product Updated',
          description: 'The product was updated successfully.',
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to update product");
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This action will delete the product permanently.',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          dispatch(deleteProductById(productId));
          dispatch(setSubCategoryId(product.subCategoryId));
          navigate(`/`);
          notification.success({
            message: 'Product Deleted',
            description: 'The product was deleted successfully.',
          });
        } catch (error) {
          setError("Failed to delete product");
        }
      },
    });
  };

  return (
    <div className="container">
      <h1>Product Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product ? (
        <div>
          <p>
            <strong>Title:</strong> {product.title}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "200px" }}
            />
          </p>
          <Button type="primary" onClick={() => setShowModal(true)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={handleDelete}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal
        title="Edit Product"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          initialValues={formData}
          onFinish={handleFormSubmit}
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

      <style jsx>{`
        .container {
          padding: 20px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        button {
          margin-right: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;