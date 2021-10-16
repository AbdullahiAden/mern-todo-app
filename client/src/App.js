import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import TodoUpdatePage from "./pages/TodoUpdatePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <div>
        <nav className="navbar fixed-top navbar-light bg-dark px-3">
          <a className="navbar-brand text-light" href="/todoApp">
            Todo App
          </a>
        </nav>
      </div>
      <div className="container text-light">
        <div className="py-5">
          <Switch>
            <Route
              path="/todoApp/:id/update"
              component={TodoUpdatePage}
            ></Route>

            <Route path="/todoApp/:id" component={TodoDetailsPage}></Route>

            <Route path="/todoApp">
              <HomePage />
            </Route>
            <Route path="/signUp">
              <SignUpPage />
            </Route>

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
