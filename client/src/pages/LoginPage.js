import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginPage = () => {
  const [signUser, setSignUser] = useState([]);
  const history = useHistory();

  //   sign in user
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const api = "http://localhost:5000/login";

    try {
      await fetch(api, {
        method: "POST",
        body: JSON.stringify(signUser),
        
        headers: {
          "Content-Type": "application/json",
          withCredentials: true, credentials: 'include'
        },

      })
        .then((res) => res.json())
        .then((data) => {
          setSignUser(data);
          console.log(data);
          if (data.user) {
            localStorage.setItem('jwt', data.jwt);

            history.push("/todoApp");
            console.log(signUser);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1>Login </h1>

      <div className="container">
        <form onSubmit={handleOnSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) =>
                setSignUser({ ...signUser, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setSignUser({ ...signUser, password: e.target.value })
              }
            />
          </div>
          <div className="form-check"></div>
          <button className="btn btn-primary">Login</button>
        </form>

        <Link to="/signUp">
          {" "}
          <button type="submit" className="btn btn-outline-primary mt-3">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
