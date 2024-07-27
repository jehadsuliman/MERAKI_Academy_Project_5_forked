import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSubCategoryId } from "../../Service/api/redux/reducers/shop/subCategoriesSlice";
import axios from "axios";

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
      <h2>Sub Categories List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {subCategories.length > 0 ? (
        <ul>
          {subCategories.map((subCategory) => (
            <li
              key={subCategory.id}
              onClick={() => handleSubCategoryClick(subCategory.id)}
            >
              {subCategory.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubCategoriesList;
