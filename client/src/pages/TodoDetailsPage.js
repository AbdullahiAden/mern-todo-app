import React, { useEffect, useState } from "react";

const TodoDetailsPage = (props) => {
  const { id } = props.match.params;
  const api = ` http://localhost:5000/api/todoApp/${id}`;

  const [singleTodo, setSingleTodo] = useState([]);

  //   get the details of a single todo
  async function fetchSingleTodo() {
    const res = await fetch(api);
    const data = await res.json();

    setSingleTodo(data.singleTodo);
  }

  useEffect(() => {
    fetchSingleTodo();
  }, []);
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
                {console.log(typeof todo.updatedAt)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoDetailsPage;
