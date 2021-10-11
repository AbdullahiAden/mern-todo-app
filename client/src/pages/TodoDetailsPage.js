import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";

const TodoDetailsPage = (props) => {
  const { id } = props.match.params;
  const api = ` http://localhost:5000/api/todoApp/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);
  const [newTodo, setNewdTodo] = useState({ title: "", content: "" });
  const [updatedTodo, setUpdatedTodo] = useState({ title: "", content: "" });
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
    const url = ` http://localhost:5000/api/todoApp/${id}/delete `;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/todoApp"));
  }
  //   update todo --------
  async function updateTodo(e) {
    await fetch(api, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),

      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/todoApp"));
  }

  return (
    <div className="conatiner shadow m-3 p-3 rounded border-bottom border-primary text-light">
      {singleTodo.length < 0 ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <div>
            <h1>
              Title:{" "}
              <span className="border-3 border-primary ">
                {singleTodo.title}
              </span>{" "}
            </h1>

            <h1>Content: {singleTodo.content}</h1>
            {/* get only the first 10 char, which the year, month, day */}
            <div className="py-3">
              {" "}
              {singleTodo.updatedAt && (
                <p>Updated Last: {singleTodo.updatedAt.slice(0, 10)}</p>
              )}
            </div>

            {/* <Link to={`/todoApp/${todo._id}/update`}>Update</Link> */}

            <div>
              <button
                type="button"
                className="btn btn-success m-2"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Update
              </button>

              <button onClick={deleteTodo} className="btn btn-danger ">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetailsPage;
