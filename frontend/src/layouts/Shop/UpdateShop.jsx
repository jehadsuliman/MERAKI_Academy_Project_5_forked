import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    shopname: "",
    country: "",
    email: "",
    password: "",
    category_id: "",
    role_id: "",
    description: "",
    profile_pic: "",
    phone_number: "",
  });

  const [error, setError] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/shops/${id}`);
          if (response.data && response.data.result) {
            setShop(response.data.result);
          } else {
            setError("Shop data not found");
          }
        } catch (error) {
          setError("Failed to fetch shop details");
        }
      };

      fetchShop();
    } else {
      setError("Shop ID is not defined");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/shops/${id}`,
        shop
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
          <strong>Description:</strong> {shop.description}
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
                name="shopName"
                value={shop.shopName}
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
              <label>Role ID:</label>
              <input
                type="text"
                name="role_id"
                value={shop.role_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={shop.description}
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
