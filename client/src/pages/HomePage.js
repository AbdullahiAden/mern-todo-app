import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { Link } from "react-router-dom";

const HomePage = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });

  //   adding new todo
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const api = "http://localhost:5000/api/todoApp/new";

    await fetch(api, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNewTodo(data);

        window.location.reload();
      });
  };

  async function fetchAllTodos() {
    const api = "http://localhost:5000/api/todoApp";

    const res = await fetch(api);
    const data = await res.json();
    setAllTodos(data.allTodos);
  }
  async function fetchSingleTodo(id) {
    const api = ` http://localhost:5000/api/todoApp/${id}`;

    const res = await fetch(api);
    const data = await res.json();
    setSingleTodo(data.singleTodo[0]);
  }
  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div className=" m-3 text-light">
      <h1>Todo App</h1>

      <div>
        <button
          type="button"
          className="btn btn-primary m-3 "
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add A New Todo
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Todo
                </h5>
                <button
                  type="button"
                  className="close btn btn-outline-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body ">
                <form
                  action="/api/todoApp/new"
                  method="Post"
                  onSubmit={handleOnSubmit}
                >
                  <div className="form-group col mb-3">
                    <label htmlFor="title ">Title:</label>
                    <input
                      required
                      type="text"
                      className="form-control mt-2"
                      id="title"
                      name="title"
                      placeholder="Enter Todo"
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group col mb-3">
                    <label htmlFor="content">Content:</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="content"
                      placeholder="Enter content"
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, content: e.target.value })
                      }
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {allTodos.length < 0 ? (
          <div>
            <p>LOADING</p>
          </div>
        ) : (
          <div>
            {/* reverse the array bofore map */}
            {allTodos
              .slice(0)
              .reverse()
              .map((todo, index) => {
                return (
                  <div className="shadow border border-primary m-3 rounded p-2">
                    <Link
                      to={`/todoApp/${todo._id}`}
                      className="text-decoration-none text-light"
                    >
                      <div
                        onClick={() => {
                          fetchSingleTodo(allTodos[index]._id);
                        }}
                      >
                        <strong>{todo.title}</strong>
                        {/* get only the first 10 char, which the year, month, day */}

                        <p className="pt-2">
                          <small>{todo.updatedAt.slice(0, 10)}</small>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
