import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setProducts,
  deleteProductById,
} from "../../Service/api/redux/reducers/shop/product";
import Table from "react-bootstrap/Table";
import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const authToken = useSelector((state) => state.shopAuth.token);
  const [error, setError] = React.useState("");

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [dispatch]);

  const handleDelete = (productId) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action will delete the product permanently.",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          dispatch(deleteProductById(productId));
          notification.success({
            message: "Product Deleted",
            description: "The product was deleted successfully.",
          });
          getAllProducts();
        } catch (error) {
          setError("Failed to delete product");
          notification.error({
            message: "Deletion Failed",
            description:
              error.message || "An error occurred while deleting the product.",
          });
        }
      },
    });
  };

  const handleUpdate = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Products List</h3>
      <Table responsive className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>
                <img
                  src={product.image}
                  style={{ width: "75px" }}
                  alt="product"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ProductList;
