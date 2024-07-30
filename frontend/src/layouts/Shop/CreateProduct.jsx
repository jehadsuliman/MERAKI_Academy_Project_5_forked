import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import {
  message,
  Upload,
  Card,
  Space,
  Input,
  Button,
  Select,
  notification,
} from "antd";

const AddProduct = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const navigate = useNavigate();
  const [showData, setShowData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    sub_category_id: "",
  });
  const { Dragger } = Upload;
  const [image, setImage] = useState("");
  const uploadPreset = "khaledOdehCloud";
  const [noCategories, setNoCategories] = useState(false);
  const [error, setError] = useState(null);

  const props = {
    name: "file",
    multiple: false,
    action: "https://api.cloudinary.com/v1_1/das0e3reo/image/upload",
    data: {
      upload_preset: uploadPreset,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImage(info.file.response.url);
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: info.file.response.url,
        }));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setProduct((prevProduct) => ({ ...prevProduct, sub_category_id: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.image ||
      !product.sub_category_id
    ) {
      message.error("Please fill in all the required fields.");
      return;
    }

    if (!authToken) {
      setError("Authentication token is missing");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/products`,
        product,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setShowData(response.data.Product);
        message.success("Product added successfully!");
        navigate(`/shop`);
      } else {
        setError(response.data.message);
        message.error(response.data.message);
      }
    } catch (error) {
      setError("Failed to add product");
      message.error("Failed to add product");
    }
  };

  const getCategoryByShopId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/subCategories/shop/${shopId}`
      );

      if (response.data.success) {
        const subCategories = response.data.subCategories;

        const formattedSubCategories = Array.isArray(subCategories)
          ? subCategories
          : [subCategories];

        setCategories(formattedSubCategories);
        setNoCategories(formattedSubCategories.length === 0);

        if (formattedSubCategories.length === 0) {
          notification.destroy();
          notification.info({
            message: "Create Sub Category Required",
            description:
              "You need to create at least one sub-category before adding a product.",
            duration: null,
          });
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategoryByShopId();
  }, [shopId]);

  return (
    <Space direction="vertical" size={16}>
      <Card>
        <label>Title:</label>
        <Input
          type="text"
          name="title"
          placeholder="Title.."
          maxLength={20}
          value={product.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <Input
          type="text"
          name="description"
          placeholder="Description.."
          value={product.description}
          onChange={handleChange}
        />

        <label>Price:</label>
        <Input
          type="number"
          name="price"
          placeholder="Price.."
          value={product.price}
          onChange={handleChange}
        />

        <label>Sub Category:</label>
        <Select
          placeholder="Select a sub-category"
          value={product.sub_category_id}
          onChange={handleSelectChange}
          style={{ width: "100%" }}
          disabled={noCategories}
        >
          {categories.map((cat) => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.description}
            </Select.Option>
          ))}
        </Select>

        <Dragger {...props} style={{ marginTop: "16px" }}>
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
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          Add Product
        </Button>
        {error && (
          <div style={{ color: "red", marginTop: "16px" }}>{error}</div>
        )}
      </Card>
    </Space>
  );
};

export default AddProduct;
