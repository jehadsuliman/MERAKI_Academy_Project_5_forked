import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Upload, Card, Space, Input, Button, message } from "antd";

const CreateSubCategory = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const [subCategory, setSubCategory] = useState({
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subCategory.description.trim()) {
      message.error("Please enter a sub-category description.");
      return;
    }

    if (!authToken) {
      message.error("Please ensure you are logged in ");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/subCategories",
        subCategory,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        message.success("Sub-category created successfully");
        setSubCategory({ description: "" });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(`Please ensure you are logged in `);
    }
  };

  return (
    <Card>
      <Space direction="vertical" size={16}>
        <h3>Create New Sub-Category</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <Input
              type="text"
              name="description"
              value={subCategory.description}
              onChange={handleChange}
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "15px" }}
          >
            Create Sub-Category
          </Button>
        </form>
      </Space>
    </Card>
  );
};

export default CreateSubCategory;
