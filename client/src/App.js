import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import TodoCreatePage from "./pages/TodoCreatePage";
import HomePage from "./pages/HomePage";
import TodoDetailsPage from "./pages/TodoDetailsPage";

function App() {
  return (
    <div className="container">
      {/* --- Routes */}
      <Switch>
        {/* <Route path="/todoApp/new">
          <TodoCreatePage />
        </Route> */}
        <Route path="/todoApp/:id" component={TodoDetailsPage}></Route>

        <Route path="/todoApp">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
