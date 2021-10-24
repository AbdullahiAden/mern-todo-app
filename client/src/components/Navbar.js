import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const token = localStorage.getItem("jwt");

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  function logoutUser() {
    console.log("clicked logout ");
    localStorage.removeItem("jwt");
    history.push("/login");
  }

  useEffect(() => {}, []);

  return (
    <div className=" ">
      <nav className="navbar navbar-expand-md navbar-dark bg-primary px-3">
        <a className="navbar-brand " href="/todoApp">
          <h3 className="mb-0 "> TODO APP </h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          {token && (
            <ul className="navbar-nav ">
              <li className="nav-item" />
              <li className="nav-item">
                <a className="nav-link text-light" href="/todoApp">
                  My Todos
                </a>
              </li>

              <li className="nav-item">
                <li className="nav-link text-light" href="#">
                  {/* {user.fullName} */}
                </li>
              </li>

              <li>
                <a
                  href="/login"
                  onClick={logoutUser}
                  className="nav-link text-light"
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
          {!token && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light" href="/todoApp">
                  All Todos
                </a>
              </li>
              <a className="nav-link text-light" href="/login">
                Login 
              </a>
              <span>
                <a className="nav-link text-light" href="/signup">
                  Sign up
                </a>{" "}
              </span>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
