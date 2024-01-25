import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

const options = [
  { values: "low", lables: "Low Priority" },
  { values: "medium", lables: "Medium Priority" },
  { values: "high", lables: "High Priority" },
];

const App = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/task", {
      method: "POST",

      body: JSON.stringify({ task: task, priority: priority }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  };

  const [taskItme, setTaskItem] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/task")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTaskItem(data);
      });
  }, []);

  return (
    <div className="container">
      <h4>Priority To-Do List</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row d-flex">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              aria-describedby="Todo"
              placeholder="Add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <select
              className="form-select"
              aria-label=".form-select-lg example"
              onChange={(e) => setPriority(e.target.value)}
            >
              {options.map((item) => {
                return (
                  <option key={item.values} value={item.values}>
                    {item.lables}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      {taskItme.map((item) => (
        <div key={item._id} className="d-flex justify-content-between mt-2">
          <p>{item.task}</p>

          <div>
            <h5>Low Priority</h5>
          </div>
          <div>
            <h5>Medium Priority</h5>
          </div>
          <div>
            <h5>High Priority</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
