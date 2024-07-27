import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateProductById, setProducts } from "../../Service/api/redux/reducers/shop/product"; // adjust the path to your productsSlice file

const UpdateProduct = () => {
  const authToken = useSelector((state) => state.shopAuth.token);
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProduct, setUpdateProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    sub_category_id: "",
  });

  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (shopId && authToken) {
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
          if (response.data && response.data.product) {
            setUpdateProduct(response.data.product);
            dispatch(setProducts([response.data.product])); // Set the product in the Redux store
          } else {
            setError("Product data not found");
          }
        } catch (error) {
          setError("Failed to fetch product details");
        }
      };

      fetchProduct();
    } else {
      setError("Product ID or authentication token is not defined");
    }
  }, [productId, authToken, shopId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      setError("Authentication token is missing");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/products/${productId}`,
        updateProduct,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(updateProductById(updateProduct));
        navigate("/products");
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to update product");
    }
  };

  return (
    <div>
      <h3>Product Details</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>
          <strong>Title:</strong> {updateProduct.title}
        </p>
        <p>
          <strong>Description:</strong> {updateProduct.description}
        </p>
        <p>
          <strong>Price:</strong> {updateProduct.price}
        </p>
        <p>
          <strong>Image:</strong> {updateProduct.image}
        </p>
        <button onClick={() => setShowUpdate(true)}>Edit</button>
      </div>

      {showUpdate && (
        <div>
          <h3>Update Product</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={updateProduct.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={updateProduct.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={updateProduct.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={updateProduct.image}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;