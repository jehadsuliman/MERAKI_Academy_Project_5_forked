import axios from "axios";

export const DeleteShopById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/shops/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete shop");
  }
};
