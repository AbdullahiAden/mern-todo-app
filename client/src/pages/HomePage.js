import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoCreatePage from "./TodoCreatePage";

const HomePage = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState([]);

  async function fetchAllTodos() {
    const api = "http://localhost:5000/api/todoApp";

    const res = await fetch(api);
    const data = await res.json();
    setAllTodos(data.allTodos);
    // console.log(allTodos);
  }
  async function fetchSingleTodo(id) {
    // const { id } = props.match.params;
    const api = ` http://localhost:5000/api/todoApp/${id}`;
    // console.log(api);

    const res = await fetch(api);
    const data = await res.json();
    setSingleTodo(data.singleTodo[0]);
    console.log(singleTodo);
  }
  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>

      <Link to={"/todoApp/new"} component={TodoCreatePage}>
        Add New Todo
        {/* <button className="btn btn-primary btn-sm mb-2 "></button> */}
      </Link>

      <div className="row">
        {allTodos.map((todo, index) => {
          return (
            <div
              className="shadow border border-primary "
              onClick={() => {
                fetchSingleTodo(allTodos[index]._id);
              }}
            >
              <div>{todo.title}</div>
              <div>{todo._id}</div>
              <p>{todo.content}</p>

              <Link to={`/todoApp/${todo._id}`}>View more </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
