import React from "react";

const Posts = ({ todos, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="list-group mb-4">
      {todos.map((todo) => (
        <div key={todo.id} className="list-group-item">
          {todo.title}
          <div>
            <button className="btn btn-primary">Done</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
