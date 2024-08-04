import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import Table from "react-bootstrap/Table";
import { Modal, Card, Typography } from "antd";

const { Title, Text } = Typography;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch products");
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [dispatch]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
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
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr
              key={i}
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer" }}
            >
              <th scope="row">{i + 1}</th>
              <td>
                <img
                  src={product.image}
                  style={{ width: "150px", height: "150px" }}
                  alt="product"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && <div className="error">{error}</div>}

      {selectedProduct && (
        <Modal
          title={selectedProduct.title}
          visible={showDetailsModal}
          onCancel={handleCloseModal}
          footer={null}
          centered
        >
          <Card
            cover={
              <img
                alt={selectedProduct.title}
                src={selectedProduct.image}
                style={{ width: "470px" }}
              />
            }
          >
            <Card.Meta
              description={
                <>
                  <Text strong>Description:</Text> {selectedProduct.description}
                  <br />
                  <Text strong>Price:</Text> ${selectedProduct.price}
                </>
              }
            />
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
