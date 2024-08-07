import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Input, Button, Typography, Select } from "antd";
import axios from "axios";
import {
  fetchAddresses,
  addAddress,
} from "../../Service/api/redux/reducers/user/addres";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Token = useSelector((state) => state.userAuth.token);
  const [addressData, setAddressData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    address_type: "Home Delivery",
  });

  useEffect(() => {
    const fetchInitialAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/address", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        if (response.data.success) {
          dispatch(fetchAddresses(response.data.address));
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch addresses", error);
        message.error("Failed to fetch addresses.");
      }
    };

    fetchInitialAddresses();
  }, [dispatch]);

  const handleAddAddress = async () => {
    if (Object.values(addressData).some((field) => field.trim() === "")) {
      message.error("Please fill all fields.");
      return;
    }

    const addressTypeMap = {
      "Home Delivery": 1,
      Work: 2,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/address",
        {
          ...addressData,
          address_type: addressTypeMap[addressData.address_type] || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(addAddress(response.data.address));
        setAddressData({
          first_name: "",
          last_name: "",
          address: "",
          city: "",
          country: "",
          postal_code: "",
          address_type: "",
        });
        navigate("/");
        message.success("Address added successfully!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add address:", error);
      message.error("Failed to add address.");
    }
  };

  return (
    <div
      style={{
        margin: "40px",
        background: "#fff",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Typography.Title level={3}>Address Management</Typography.Title>
      <Input
        value={addressData.first_name}
        onChange={(e) =>
          setAddressData({ ...addressData, first_name: e.target.value })
        }
        placeholder="First Name"
        style={{ marginBottom: "10px" }}
      />
      <Input
        value={addressData.last_name}
        onChange={(e) =>
          setAddressData({ ...addressData, last_name: e.target.value })
        }
        placeholder="Last Name"
        style={{ marginBottom: "10px" }}
      />
      <Input
        value={addressData.address}
        onChange={(e) =>
          setAddressData({ ...addressData, address: e.target.value })
        }
        placeholder="Address"
        style={{ marginBottom: "10px" }}
      />
      <Input
        value={addressData.city}
        onChange={(e) =>
          setAddressData({ ...addressData, city: e.target.value })
        }
        placeholder="City"
        style={{ marginBottom: "10px" }}
      />
      <Input
        value={addressData.country}
        onChange={(e) =>
          setAddressData({ ...addressData, country: e.target.value })
        }
        placeholder="Country"
        style={{ marginBottom: "10px" }}
      />
      <Input
        value={addressData.postal_code}
        onChange={(e) =>
          setAddressData({ ...addressData, postal_code: e.target.value })
        }
        placeholder="Postal Code"
        style={{ marginBottom: "10px" }}
      />
      <Select
        value={addressData.address_type}
        onChange={(value) =>
          setAddressData({ ...addressData, address_type: value })
        }
        placeholder="Select Address Type"
        style={{ marginBottom: "10px", width: "100%" }}
      >
        <Option value="Home Delivery">Home Delivery</Option>
        <Option value="Work">Work</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleAddAddress}
        style={{ marginBottom: "20px" }}
      >
        Add Address
      </Button>
    </div>
  );
};

export default Address;
