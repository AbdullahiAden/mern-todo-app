import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });

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

  async function createNewTodo() {
    const api = "http://localhost:3000/api/todoApp/new";

    const res = await axios.post(api);

    const data = await res.json();
    return data;
    // setAllTodos(data.allTodos);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const api = "http://localhost:5000/api/todoApp/new";

    fetch(api, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNewTodo(data);

        console.log(data);
      });
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="row">
        <pre>{JSON.stringify(newTodo)}</pre>

        <form action="/api/todoApp/new" method="Post" onSubmit={handleOnSubmit}>
          <div className="form-group col">
            <label htmlFor="title">Todo title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter Todo"
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </div>
          <div className="form-group col">
            <label htmlFor="content">Content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              placeholder="Enter content"
              onChange={(e) =>
                setNewTodo({ ...newTodo, content: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
