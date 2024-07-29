import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdateShop = () => {
  const shopId = useSelector((state) => state.shopAuth.shopId);
  const authToken = useSelector((state) => state.shopAuth.token);
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    shopname: "",
    country: "",
    discreption: "",
    email: "",
    password: "",
    category_id: "",
    profile_pic: "",
    phone_number: "",
  });

  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId && authToken) {
      const fetchShop = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/shops/${shopId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data && response.data.result) {
            setShop(response.data.result);
          } else {
            setError("Shop data not found");
          }
        } catch (error) {
          setError("Failed to fetch shop details");
        } finally {
          setLoading(false);
        }
      };

      fetchShop();
    } else {
      setError("Shop ID or authentication token is not defined");
      setLoading(false);
    }
  }, [shopId, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      setError("Authentication token is missing");
      return;
    }

    try {
      const { password, ...updatedShopData } = shop;
      const response = await axios.put(
        `http://localhost:5000/shops/${shopId}`,
        updatedShopData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to update shop");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3>Shop Details</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>
          <strong>Shop Name:</strong> {shop.shopname}
        </p>
        <p>
          <strong>Country:</strong> {shop.country}
        </p>
        <p>
          <strong>Email:</strong> {shop.email}
        </p>
        <p>
          <strong>Description:</strong> {shop.discreption}
        </p>
        <p>
          <strong>Profile Picture:</strong> {shop.profile_pic}
        </p>
        <p>
          <strong>Phone Number:</strong> {shop.phone_number}
        </p>
        <button onClick={() => setShowUpdate(true)}>Edit</button>
      </div>

      {showUpdate && (
        <div>
          <h3>Update Shop</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Shop Name:</label>
              <input
                type="text"
                name="shopname"
                value={shop.shopname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={shop.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={shop.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={shop.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Category ID:</label>
              <input
                type="text"
                name="category_id"
                value={shop.category_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="discreption"
                value={shop.discreption}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Profile Picture:</label>
              <input
                type="text"
                name="profile_pic"
                value={shop.profile_pic}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={shop.phone_number}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update Shop</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateShop;
