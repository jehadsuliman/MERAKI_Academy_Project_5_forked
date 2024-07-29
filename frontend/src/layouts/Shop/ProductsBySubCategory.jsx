import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Typography, Space, notification } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProductsBySubCategory = () => {
  const subCategoryId = useSelector(
    (state) => state.subCategories.subCategoryId
  );
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!subCategoryId) {
      setError("Sub-Category ID is not set.");
      return;
    }

    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for subCategoryId: ${subCategoryId}`);
        const response = await axios.get(
          `http://localhost:5000/products/subCategory/${subCategoryId}`
        );
        console.log('API Response:', response.data);
        if (response.data.success) {
          setProducts(response.data.product || []);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div style={{  padding: '25px' }}>
      <Title level={2}>Products in Sub-Category</Title>
      {error && <Paragraph type="danger">{error}</Paragraph>}
      {products.length > 0 ? (
        <Row gutter={20}>
          {products.map((product) => (
            <Col span={6} key={product.id} >
              <Card
                hoverable
                cover={<img alt={product.title} src={product.image} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />}
                onClick={() => handleProductClick(product.id)}
                style={{ marginBottom: '25px' }}
              >
                <Card.Meta
                  title={product.title}
                  description={product.description}
                />
                <div style={{ marginTop: '30px' }}>
                  <Paragraph>${product.price}</Paragraph>
                </div>
                <Space style={{ marginTop: '10px' }}>
                  <Space>
                    <StarOutlined /> 1
                  </Space>
                  <Space>
                    <LikeOutlined /> 1
                  </Space>
                  <Space>
                    <MessageOutlined /> 1
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Paragraph>No products found.</Paragraph>
      )}
    </div>
  );
};

export default ProductsBySubCategory;