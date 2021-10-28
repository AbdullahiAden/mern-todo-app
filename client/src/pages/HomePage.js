import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const HomePage = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [usersTodos, setUsersTodos] = useState([]);
  const history = useHistory();
  let userId;

  const token = localStorage.getItem("jwt");
  // get logged in user's info from token
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  if (token) {
    userId = parseJwt(token).id;
  }
  const [newTodo, setNewTodo] = useState({
    title: "",
    content: "",
    user: userId,
  });

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
    const api = "https://mern-todoapp-be3.herokuapp.com/api/todoApp";
    const res = await fetch(api);
    const data = await res.json();
    setAllTodos(data.allTodos);
  }

  async function fetchUsersTodos() {
    // const userId = parseJwt(token).id;
    const api = `http://localhost:5000/api/todoApp/user/${userId}`;
    const res = await fetch(api);
    const data = await res.json();
    setUsersTodos(data.usersTodos);
  }

  useEffect(() => {

    if (token) {
      fetchUsersTodos();
    } else {
      
      fetchAllTodos();
    }
    
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

      {token ? (
        <div className="row">
          {usersTodos.length < 0 ? (
            <div>
              <p>LOADING</p>
            </div>
          ) : (
            <div>
              {usersTodos
                .slice(0)
                .reverse()
                .map((todo, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow border border-primary m-3 rounded p-2"
                    >
                      <Link
                        to={`/todoApp/${todo._id}`}
                        className="text-decoration-none text-light"
                      >
                        <div>
                          <strong>{todo.title}</strong>
                          <p>{todo.content}</p>
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
      ) : (
        <div className="row">
          {allTodos.length < 0 ? (
            <div>
              <p>LOADING</p>
            </div>
          ) : (
            <div>
              {allTodos
                .slice(0)
                .reverse()
                .map((todo, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow border border-primary m-3 rounded p-2"
                    >
                      <Link
                        to={`/todoApp/${todo._id}`}
                        className="text-decoration-none text-light"
                      >
                        <div>
                          <strong>{todo.title}</strong>
                          <p>{todo.content}</p>
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
      )}
    </div>
  );
};

export default HomePage;
