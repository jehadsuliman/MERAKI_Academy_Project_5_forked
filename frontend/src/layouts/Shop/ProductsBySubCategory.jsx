import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsBySubCategory = () => {
  const subCategoryId = useSelector(
    (state) => state.subCategories.subCategoryId
  );
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!subCategoryId) {
      setError("Sub-Category ID is not set.");
      return;
    }

    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for subCategoryId: ${subCategoryId}`);
        const response = await axios.get(
          `http://localhost:5000/products/subCategory/${subCategoryId}`
        );
        console.log('API Response:', response.data);
        if (response.data.success) {
          setProducts(response.data.product || []);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <h2>Products in Sub-Category</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
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
                <strong>Image:</strong>{" "}
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100px" }}
                />
              </p>
              <hr />
            </li>
          ))}
        </ul>
        
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsBySubCategory;