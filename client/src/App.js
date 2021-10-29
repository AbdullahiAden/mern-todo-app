import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import TodoUpdatePage from "./pages/TodoUpdatePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container text-light">
        <div className="py-5">
          <Switch>
            <Route
              path="/todoApp/:id/update"
              component={TodoUpdatePage}
            ></Route>

            <Route path="/todoApp/:id" component={TodoDetailsPage}></Route>

            <Route path="/signUp">
              <SignUpPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
