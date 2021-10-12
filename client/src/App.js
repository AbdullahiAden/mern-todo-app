import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import TodoUpdatePage from "./pages/TodoUpdatePage";

function App() {
  return (
    <div className="container text-light">
      <Switch>
        <Route path="/todoApp/:id/update" component={TodoUpdatePage}></Route>

        <Route path="/todoApp/:id" component={TodoDetailsPage}></Route>

        <Route path="/todoApp">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
