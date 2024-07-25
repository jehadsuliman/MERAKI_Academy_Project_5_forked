import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";

const ShopLogin = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/shops/login",
        form
      );
      dispatch(setLogin(response.data.token));
      dispatch(setShopId(response.data.shopId));
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Shop</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default ShopLogin;
