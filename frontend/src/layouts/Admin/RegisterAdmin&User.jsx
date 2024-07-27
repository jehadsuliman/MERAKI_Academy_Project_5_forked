import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState(0);
  const [role_id, setRole_id] = useState("");

  const addNewUser = () => {
    const userData = {
      userName,
      email,
      password,
      country,
      age,
      role_id,
    };
    axios
      .post("http://localhost:5000/users/register", userData)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="Form">
        <>
          <p className="Title">Register:</p>
          <form onSubmit={addNewUser}>
            <br />
            <input
              type="text"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <select name="role"
          onChange={(e) => setRole_id(e.target.value)}
          value={role_id}
        >
              <option value="1">
                Admin
              </option>
              <option value="2">
                User
              </option>
            </select>
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
            <button>Register</button>
            <br />
          </form>
        </>
      </div>
    </>
  );
};

export default Register;
