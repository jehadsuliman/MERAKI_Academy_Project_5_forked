import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSubCategoryId } from "../../Service/api/redux/reducers/shop/subCategoriesSlice";
import axios from "axios";
import { Button, Space } from "antd";

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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {subCategories.length > 0 ? (
        <Space size={16} wrap>
          {subCategories.map((subCategory) => (
            <Button
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory.id)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                textAlign: "left",
                width: "200px",
                height: "50px",
                marginTop: "10px",
                marginBottom: "0px",
              }}
            >
              <span>{subCategory.description}</span>
            </Button>
          ))}
        </Space>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubCategoriesList;
