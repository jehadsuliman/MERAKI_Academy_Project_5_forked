import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCarts } from "../../Service/api/redux/reducers/user/carts";

const Carts = () => {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => {
    return {
      token: state.userAuth.token,
      userId: state.userAuth.userId,
    };
  });
  const { carts } = useSelector((state) => ({
    carts: state.carts.carts,
  }));


  const getCartsByUserId = () => {
    const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    axios
      .get(`http://localhost:5000/carts/user`,header)
      
      .then((result) => {
        dispatch(setCarts(result.data.carts));
        console.log(result.data.carts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCartsByUserId();
  }, []);

  return (
    <div>
      <h1>Your Carts</h1>
      {carts.length > 0 ? (
        <ul>
          {carts.map((cart) => (
            <li key={cart.id}>
              Product ID: {cart.product_id}, Quantity: {cart.quantity}, Total
              Price: {cart.total_price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
};

export default Carts;
