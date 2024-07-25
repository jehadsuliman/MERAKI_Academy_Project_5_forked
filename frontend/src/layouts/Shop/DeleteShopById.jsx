import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteShop = ({ shopId }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/shops/shop/${shopId}`);
      if (response.data.success) {
        setSuccess(response.data.message);
        navigate("/")
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("Failed to delete shop");
    }
  };

  return (
    <div>
      <h2>Delete Shop</h2>
      <button onClick={handleDelete}>Delete Shop</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default DeleteShop;