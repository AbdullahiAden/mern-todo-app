import React, { useState } from "react";

const TodoCreatePage = () => {
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });

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
        window.location.reload();
      });
  };
  return (
    <div>
      <h1>Create New Todo</h1>
      <div className="row">
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
    </div>
  );
};

export default TodoCreatePage;
