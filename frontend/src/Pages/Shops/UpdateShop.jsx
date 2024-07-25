import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    shopName: "",
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
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shops/${id}`);
        setShop(response.data.result);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      }
    };

    fetchShop();
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
        navigate("/all");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating shop:", error);
      setError("Failed to update shop");
    }
  };

  const handleToggleClick = () => {
    setShowFields(!showFields);
  };

  return (
    <div>
      <h3>Update Shop</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {showFields ? (
          <>
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
              <textarea
                name="description"
                value={shop.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label>Profile Picture URL:</label>
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
          </>
        ) : (
          <p>Click "Show Update Form" to edit shop details</p>
        )}
        <button type="button" onClick={handleToggleClick}>
          {showFields ? "Hide Update Form" : "Show Update Form"}
        </button>
      </form>
    </div>
  );
};

export default UpdateShop;
