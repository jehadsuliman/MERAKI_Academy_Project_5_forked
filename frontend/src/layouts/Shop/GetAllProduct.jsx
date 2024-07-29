import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../Service/api/redux/reducers/shop/product";
import Table from "react-bootstrap/Table";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log(products)

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        dispatch(setProducts(result.data.products));
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [dispatch]);

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
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td><img src={product.image} style={{width: '75px'}}></img></td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;