import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

const TodoUpdate = (props) => {
  const { id } = props.match.params;
  const api = ` http://localhost:5000/api/todoApp/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);
  const [updateTodo, setUpdateTodo] = useState({ title: "", content: "" });

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
    const updateApi = ` http://localhost:5000/api/todoApp/${id}/update`;

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
        // window.location.reload();
      });
  };

  useEffect(() => {
    fetchSingleTodo();
  }, []);

  return (
    <div>
      <form
        method="post"
        onSubmit={updateSingleTodo}
      >
        <div className="form-group col mb-3">
          <pre>{JSON.stringify(singleTodo)}</pre>
          <label htmlFor="title ">Title:</label>
          <input
            type="text"
            className="form-control mt-2"
            id="title"
            name="title"
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
