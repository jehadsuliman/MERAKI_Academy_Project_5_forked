import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Input, Button, List, Typography, Space, Select } from "antd";
import axios from "axios";
import {
  fetchAddresses,
  addAddress,
  deleteAddressById,
} from "../../Service/api/redux/reducers/user/addres";

const { Text } = Typography;
const { Option } = Select;

const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);
  const [addressData, setAddressData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    address_type: "",
  });

  useEffect(() => {
    const fetchInitialAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/addresses");
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

    try {
      const response = await axios.post(
        "http://localhost:5000/addresses",
        addressData
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
        message.success("Address added successfully!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add address:", error);
      message.error("Failed to add address.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/addresses/${addressId}`
      );
      if (response.data.success) {
        dispatch(deleteAddressById(addressId));
        message.success("Address deleted successfully!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
      message.error("Failed to delete address.");
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
      <List
        bordered
        dataSource={addresses}
        renderItem={(address) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleDeleteAddress(address.id)}
              >
                Delete
              </Button>,
            ]}
            style={{
              marginTop: "15px",
              background: "#fff",
            }}
          >
            <Space direction="vertical">
              <Text>
                {address.first_name} {address.last_name}
              </Text>
              <Text>{address.address}</Text>
              <Text>{address.city}</Text>
              <Text>{address.country}</Text>
              <Text>{address.postal_code}</Text>
              <Text>{address.address_type}</Text>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Address;
