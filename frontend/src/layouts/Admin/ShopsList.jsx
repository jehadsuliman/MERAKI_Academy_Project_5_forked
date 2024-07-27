import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setShops } from "../../Service/api/redux/reducers/shop/shop";
import Table from "react-bootstrap/Table";

const ShopsList = () => {
  const dispatch = useDispatch();

  const { shops } = useSelector((state) => {
    return {
      shops: state.shops.shops,
    };
  });
  const getAllShops = () => {
    axios
      .get("http://localhost:5000/shops")
      .then((result) => {
        dispatch(setShops(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllShops();
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Shops List</h1>
      <Table responsive className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">Shop Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Email</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{shop.shopname}</td>
              <td>{shop.name}</td>
              <td>{shop.discreption}</td>
              <td>{shop.email}</td>
              <td>{shop.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShopsList;
