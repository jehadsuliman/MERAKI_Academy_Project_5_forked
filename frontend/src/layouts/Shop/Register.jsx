import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";


const ShopRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [from, setFrom] = useState({
    shopName: "",
    country: "",
    phone_number: "",
    email: "",
    password: "",
    category_id: "",
  });

  const handleChange = (e) => {
    setFrom({ ...from, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...from,
      role_id: 3,
    };
    console.log(dataToSend)
    try {
      const response = await axios.post(
        "http://localhost:5000/shops/register",
        dataToSend
      );
      dispatch(setLogin(response.data.token));
      dispatch(setShopId(response.data.shopId));
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
        value={from.shopName}
        onChange={handleChange}
        placeholder="Shop Name"
      />
      <input
        type="text"
        name="country"
        value={from.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="phone_number"
        value={from.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="email"
        name="email"
        value={from.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={from.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="text"
        name="category_id"
        value={from.category_id}
        onChange={handleChange}
        placeholder="Category ID"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default ShopRegister;
