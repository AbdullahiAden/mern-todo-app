import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [newUser, setNewUser] = useState([]);

  const history=useHistory()

  //   sign up new user
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const api = "http://localhost:5000/signUp";

    await fetch(api, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNewUser(data);
        history.push("/")
        
      });
  };
  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group my-3">
          <label htmlFor="oo">Email address</label>
          <input
            type="email"
            // name="email"
            className="form-control"
            // id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            // name="password"
            // id="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}

          />
        </div>
        <div className="form-check"></div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
      <Link to="/">
        {" "}
        <button type="submit" className="btn btn-outline-primary mt-3">
          Login
        </button>
      </Link>
    </div>
  );
};

export default SignUp;
