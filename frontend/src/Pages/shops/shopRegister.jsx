import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-dom";
import {
  setLogin,
  setShopId,
} from "../../Service/api/redux/reducers/auth/shopAuth";

const ShopRegister = () => {
  const [from, setFrom] = useState({
    shopName: "",
    country: "",
    phone_number: "",
    email: "",
    password: "",
    category_id: "",
    role_id: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFrom({ ...from, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefalut();
    try {
      const response = await axios.post("/shops/register", from);
      dispatch(setLogin(response.data.token));
      dispatch(setShopId(response.data.shopId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
   </div>
  );
};

export default ShopRegister;
