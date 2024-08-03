import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const ProductDetail = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ProductDetail();
  }, []);

 

  if (!product) {
    return <></>;
  }

  return (
    <div style={{ padding: "20px", display: "grid", justifyContent: "center" }}>
      <Card style={{ maxWidth: "100%", display: "flex" }}>
        <div style={{ grid: 1, paddingRight: "20px" }}>
          <img
            alt={product[0].title}
            src={product[0].image}
            style={{ height: "400px", width: "400px" }}
          />
        </div>
        
        <div style={{ grid: 1 }}>
          <Meta
            title={product[0].title}
            description={
              <div>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  {product[0].price} JOD
                </p>
                <p>{product[0].description}</p>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  style={{ marginTop: "10px" }}
                >
                  Add to Cart
                </Button>
              </div>
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;