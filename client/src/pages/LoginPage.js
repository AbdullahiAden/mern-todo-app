import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <h1>Login </h1>

      <div className="container">
        <form>
          <div className="form-group my-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check"></div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <Link to="/signUp"> <button type="submit" className="btn btn-outline-primary mt-3">
          Register
        </button></Link>
       
      </div>
    </div>
  );
};

export default LoginPage;
