import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setLogin,
  setUserId,
} from "../../Service/api/redux/reducers/auth/userAuth";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    axios
      .post("http://localhost:5000/users/login", userData)
      .then((result) => {
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={login}>
          <br />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onSubmit={login}>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
