import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategories } from "../../Service/api/redux/reducers/categories/categories";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import { Row, Col, Card } from "antd"; 

const Categories = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => ({
    categories: state.categories.categories,

  }));

  const getAllCategories = () => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => {
        dispatch(setCategories(result.data.categories));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProductsByCategoryId = (categoryId) => {
    axios
      .get(`http://localhost:5000/products/category/${categoryId}`)
      .then((result) => {
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ padding: "20px", paddingTop:'50px'}}>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col key={category.id} xs={10} sm={8} md={6} lg={6}
          onClick={() => getAllProductsByCategoryId(category.id)}
          >
            <Card
              
              style={{ backgroundColor: "#F5F5F5",textAlign: "center", border: "none" }}
              cover={
                <div
                  style={{
                    width: "75px",
                    height: "75px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                >
                  <img
                    alt={category.name}
                    src={category.image}
                    style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  />
                </div>
              }
            >
              <Card.Meta title={category.name}  style={{ cursor: "pointer" }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
