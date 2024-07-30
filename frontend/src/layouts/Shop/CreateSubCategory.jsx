import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Upload, Card, Space, Input, Typography } from "antd";

const CreateSubCategory = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const [subCategory, setSubCategory] = useState({
    description: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      setError("Authentication token is missing");
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
        setSuccess("Sub-category created successfully");
        setSubCategory({ description: "" });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to create sub-category");
    }
  };

  return (
    <Card>
      <Space direction="vertical" size={16}>
        <h3>Create New Sub-Category</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {success && <p style={{ color: "green" }}>{success}</p>}
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
          <button
            type="submit"
            style={{
              marginTop: "15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "rgb(245,245,245)",
              color: "ffffff",
            }}
          >
            Create Sub-Category
          </button>
        </form>
      </Space>
    </Card>
  );
};

export default CreateSubCategory;
