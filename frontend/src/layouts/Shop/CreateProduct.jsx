import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const navigate = useNavigate();
  const [showData, setShowData] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    sub_category_id: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        navigate(`/categories`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to add product");
    }
  };

  return (
    <div>
      <h3>Add New Product</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sub Category ID:</label>
          <input
            type="text"
            name="sub_category_id"
            value={product.sub_category_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {showData && (
        <div>
          <p>
            <strong>Product Title:</strong> {showData.title}
          </p>
          <p>
            <strong>Description:</strong> {showData.description}
          </p>
          <p>
            <strong>Price:</strong> {showData.price}
          </p>
          <p>
            <strong>Image URL:</strong> {showData.image}
          </p>
          <p>
            <strong>Sub Category ID:</strong> {showData.sub_category_id}
          </p>
          <hr></hr>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
