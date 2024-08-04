import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProductId } from "../../Service/api/redux/reducers/shop/product";
import { Modal, Card, Typography } from "antd";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { productId } = useParams();
  const authToken = useSelector((state) => state.shopAuth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(setProductId(productId));
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/products/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.data.success) {
            setProduct(response.data.product[0]);
            setShowDetailsModal(true);
          } else {
            setError(response.data.message);
          }
        } catch (error) {
          setError("Failed to fetch product details");
        }
      };

      fetchProduct();
    } else {
      setError("Product ID is not available");
    }
  }, [productId, authToken, dispatch]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Title level={2}>Product Details</Title>
      {error && <Text type="danger">{error}</Text>}
      {product ? (
        <Modal
          title={product?.title}
          visible={showDetailsModal}
          onCancel={() => navigate("/shop")}
          footer={null}
          centered
        >
          <Card
            cover={
              <img
                alt={product?.title}
                src={product?.image}
                style={{ width: "100%" }}
              />
            }
          >
            <Card.Meta
              description={
                <>
                  <Text strong>Description:</Text> {product?.description}
                  <br />
                  <Text strong>Price:</Text> ${product?.price}
                </>
              }
            />
          </Card>
        </Modal>
      ) : (
        <Text>Loading...</Text>
      )}
    </div>
  );
};

export default ProductDetail;
