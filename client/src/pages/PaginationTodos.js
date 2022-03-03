import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Todos from "../components/Todos";
import Pagination from "../components/Pagination";
import "../App.css";

const PaginationTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(20);

  const baseEndpoint = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const res = await axios.get(baseEndpoint);
      setTodos(res.data);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" mt-3  container text-light">
      <h1>Sameey</h1>
      <Todos todos={currentTodos} loading={loading} />
      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default PaginationTodos;
