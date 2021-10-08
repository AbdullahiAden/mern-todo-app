import React, { useState } from "react";

const TodoDetailsPage = () => {
  const [singleTodo, setSingleTodo] = useState([]);

  async function fetchSingleTodo(id) {
    // const { id } = props.match.params;
    const api = ` http://localhost:5000/api/todoApp/${id}`;
    // console.log(api);

    const res = await fetch(api);
    const data = await res.json();
    setSingleTodo(data.singleTodo[0]);
    console.log(singleTodo);
  }
  return <div>details</div>;
};

export default TodoDetailsPage;
