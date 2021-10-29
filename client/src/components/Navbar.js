import React from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const history = useHistory();
  const token = localStorage.getItem("jwt");

  function logoutUser() {
    localStorage.removeItem("jwt");
    history.push("/login");
  }

  return (
    <div className=" ">
      <nav className="navbar navbar-expand-md navbar-dark bg-primary px-3">
        <a className="navbar-brand " href="/">
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
                <a className="nav-link text-light" href="/">
                  My Todos
                </a>
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
              <a className="nav-link text-light" href="/">
                All Todos
              </a>
              <a className="nav-link text-light" href="/login">
                Login
              </a>
              <a className="nav-link text-light" href="/signup">
                Sign up
              </a>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
