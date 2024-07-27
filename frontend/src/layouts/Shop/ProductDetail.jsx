import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      <h2>Product Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product ? (
        <div>
          <h3>{product.title}</h3>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Image:</strong> <img src={product.image} alt={product.title} style={{ width: '200px' }} /></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;