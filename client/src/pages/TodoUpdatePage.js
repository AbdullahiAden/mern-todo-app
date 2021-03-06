import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

const TodoUpdate = (props) => {
  const { id } = props.match.params;
    const baseEndpoint = "https://mern-todoapp-be3.herokuapp.com/api/todoApp";

  const api = `${baseEndpoint}/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);
  // const [updateTodo, setUpdateTodo] = useState({ title: "", content: "" });

  const history = useHistory();

  //   get the details of a single todo
  async function fetchSingleTodo() {
    const res = await fetch(api);
    const data = await res.json();
    setSingleTodo(data.singleTodo);
  }

  //   update todo --------
  const updateSingleTodo = async (e) => {
    e.preventDefault();
    const updateApi = ` ${baseEndpoint}/${id}/update`;

    await fetch(updateApi, {
      method: "PUT",
      body: JSON.stringify(singleTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleTodo(data);
        history.push("back");
      });
  };

  useEffect(() => {
    fetchSingleTodo();
  }, []);

  return (
    <div className="my-5 p-3 shadow rounded border-bottom border-primary ">
      <form method="post" onSubmit={updateSingleTodo}>
        <div className="form-group col mb-3 ">
          <label htmlFor="title ">Title:</label>
          <input
            type="text"
            className="form-control mt-2"
            required
            value={singleTodo.title}
            onChange={(e) =>
              setSingleTodo({ ...singleTodo, title: e.target.value })
            }
          />
        </div>

        <div className="form-group col mb-3">
          <label htmlFor="content">Content:</label>

          <input
            type="text"
            className="form-control mt-2"
            id="content"
            value={singleTodo.content}
            onChange={(e) =>
              setSingleTodo({ ...singleTodo, content: e.target.value })
            }
          />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success">
            {" "}
            Update{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoUpdate;
