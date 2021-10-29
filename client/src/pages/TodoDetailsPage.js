import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const TodoDetailsPage = (props) => {
  const { id } = props.match.params;
  const baseEndpoint = "https://mern-todoapp-be3.herokuapp.com/api/todoApp";

  const api = ` ${baseEndpoint}/${id}`;

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
    const url = `${baseEndpoint}/${id}/delete`;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/todoApp"));
  }

  return (
    <div className="conatiner shadow my-5 p-3 rounded border-bottom border-primary text-light">
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

            <div>
              <button className="btn btn-success m-2">
                {" "}
                <Link
                  to={`/todoApp/${singleTodo._id}/update`}
                  className="text-decoration-none text-light "
                >
                  Update
                </Link>
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
