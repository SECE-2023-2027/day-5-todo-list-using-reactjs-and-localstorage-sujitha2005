import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    if (editId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...task, text: input } : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input }]);
    }

    setInput("");
  };

  const handleEdit = (id) => {
    const selected = tasks.find((task) => task.id === id);
    setInput(selected.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>📋 My To do List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <div className="actions">
              <button onClick={() => handleEdit(task.id)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
