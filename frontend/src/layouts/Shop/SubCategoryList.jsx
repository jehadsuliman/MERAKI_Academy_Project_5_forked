import React, { useState, useEffect } from "react";
import axios from "axios";

const SubCategoriesList = () => {
  const [Subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subCategories");
        if (response.data.success) {
          setSubCategories(response.data.categories);
        } else {
          setError(response.data.message);
          console.log(response)
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setError("Failed to fetch categories");
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <div>
      <h2>Sub Categories List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Subcategories.length > 0 ? (
        <ul>
          {Subcategories.map((Subcategory) => (
            <li key={Subcategory.id}>
              {Subcategory.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>loding...</p>
      )}
    </div>
  );
};

export default SubCategoriesList;