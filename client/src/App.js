import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="row">
        <form>
          <div className="form-group col">
            <label htmlFor="todoInput">Todo</label>
            <input
              type="text"
              className="form-control"
              id="todoInput"
              placeholder="Enter Todo"
            />
          </div>
          <div className="form-group col">
            <label htmlFor="contentInput">Content</label>
            <input
              type="text"
              className="form-control"
              id="contentInput"
              placeholder="Enter content"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
