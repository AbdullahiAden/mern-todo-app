import React, { useEffect, useState } from "react";

const TodoDetailsPage = (props) => {
  const { id } = props.match.params;
  //   console.log(id);
  const api = ` http://localhost:5000/api/todoApp/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);

  //   get the details of a single todo
  async function fetchSingleTodo() {
    const res = await fetch(api);
    const data = await res.json();
    console.log(data.singleTodo);

    setSingleTodo(data.singleTodo);
    // console.log(singleTodo);
  }

  useEffect(() => {
    fetchSingleTodo();
  }, []);
  return (
    <div className="conatiner shadow m-3">
      {singleTodo.map((todo) => {
        return (
          <div className=" shadow ">
            <h1>
              Title:{" "}
              <span className="border-3 border-primary border-bottom">
                {todo.title}
              </span>{" "}
            </h1>
            <h1>Content: {todo.content}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default TodoDetailsPage;
