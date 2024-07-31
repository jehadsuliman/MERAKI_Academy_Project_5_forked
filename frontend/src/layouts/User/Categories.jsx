import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategories } from "../../Service/api/redux/reducers/categories/categories";
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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col key={category.id} xs={10} sm={6} md={5} lg={5}>
            <Card
              
              style={{ textAlign: "center", border: "none" }}
              cover={
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                >
                  <img
                    alt={category.name}
                    src={category.image}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              }
            >
              <Card.Meta title={category.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
