import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";

const TodoDetailsPage = (props) => {
  const { id } = props.match.params;
  const api = ` http://localhost:5000/api/todoApp/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);
  const history = useHistory();

  //   get the details of a single todo
  async function fetchSingleTodo() {
    const res = await fetch(api);
    const data = await res.json();

    setSingleTodo(data.singleTodo);
  }

  useEffect(() => {
    fetchSingleTodo();
  }, []);

  //   delete todo
  async function deleteTodo(e) {
    await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/todoApp"));
  }

  return (
    <div className="conatiner shadow m-3">
      {singleTodo.length < 0 ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {singleTodo.map((todo, index) => {
            return (
              <div key={index} className=" shadow ">
                <h1>
                  Title:{" "}
                  <span className="border-3 border-primary border-bottom">
                    {todo.title}
                  </span>{" "}
                </h1>
                <h1>Content: {todo.content}</h1>
                {/*  ONLY DATE ----------------------------- */}
                <p>Last Edit: {todo.updatedAt}</p>

                <button onClick={deleteTodo} className="btn btn-danger">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoDetailsPage;
