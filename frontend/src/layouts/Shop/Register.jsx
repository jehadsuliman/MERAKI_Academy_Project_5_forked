import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shopName: "",
    country: "",
    phone_number: "",
    email: "",
    discreption: "",
    password: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setForm({ ...form, category_id: selectedCategoryId });
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setSelectedCategoryName(selectedCategory.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      role_id: 3,
    };
    console.log(dataToSend);
    try {
      const response = await axios.post(
        "http://localhost:5000/shops/register",
        dataToSend
      );
      navigate("/shopLogin");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register Shop</h3>
      <input
        type="text"
        name="shopName"
        value={form.shopName}
        onChange={handleChange}
        placeholder="Shop Name"
      />
      <input
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="discreption"
        value={form.discreption}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <div>
        <label>Category:</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default ShopRegister;
