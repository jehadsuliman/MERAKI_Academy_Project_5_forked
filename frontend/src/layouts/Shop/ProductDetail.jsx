import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setProducts,
  updateProductById,
  deleteProductById,
} from "../../Service/api/redux/reducers/shop/product";

const ProductDetail = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.data.success) {
          setProduct(response.data.product[0]);
          setFormData(response.data.product[0]);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [productId, authToken]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/products/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(updateProductById(response.data.product));
        navigate("/products");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to update product");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch(deleteProductById(productId));
      navigate("/products");
    } catch (error) {
      setError("Failed to delete product");
    }
  };

  return (
    <div className="container">
      <h1>Product Details</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product ? (
        <div>
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><img src={product.image} alt={product.title} style={{ width: "200px" }} /></p>
          <button onClick={() => setShowModal(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Edit Product</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <button type="submit">Update Product</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          padding: 20px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        button {
          margin-right: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
        .modal {
          display: block;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-top: 10px;
        }
        input {
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;