import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.data.success) {
          setCategories(response.data.categories);
          console.log(response)
        } else {
          setError(response.data.message);
          console.log(response)
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>loding...</p>
      )}
    </div>
  );
};

export default CategoriesList;