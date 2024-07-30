import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSubCategoryId } from "../../Service/api/redux/reducers/shop/subCategoriesSlice";
import axios from "axios";
import { Card, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title } = Typography;
const SubCategoriesList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subCategories");
        if (response.data.success) {
          setSubCategories(response.data.categories);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Failed to fetch sub-categories");
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubCategoryClick = (subCategoryId) => {
    dispatch(setSubCategoryId(subCategoryId));
    navigate(`/productsBySubCategory/${subCategoryId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "20px" }}>
        Sub Categories
      </Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
                style={{
                  cursor: "pointer",
                }}
              />
            </Card>
          ))}
        </Space>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubCategoriesList;
