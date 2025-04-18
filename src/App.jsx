import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import CompletedTasks from "./pages/CompletedTasks.jsx";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
    setEditTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Router>
      <div className="App">
        <h1>TaskTracker</h1>
        <nav className="nav-links">
          <Link to="/">All Tasks</Link> | <Link to="/completed">Completed</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <TaskForm
                  addTask={addTask}
                  editTask={editTask}
                  updateTask={updateTask}
                  cancelEdit={() => setEditTask(null)}
                />

                <div className="filter-buttons">
                  <button onClick={() => setFilter("all")} className={filter === "all" ? "active-filter" : ""}>All</button>
                  <button onClick={() => setFilter("active")} className={filter === "active" ? "active-filter" : ""}>Active</button>
                  <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active-filter" : ""}>Completed</button>
                </div>

                <TaskList
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  setEditTask={setEditTask}
                  toggleComplete={toggleComplete}
                />
              </>
            }
          />
          <Route
            path="/completed"
            element={<CompletedTasks tasks={tasks.filter(task => task.completed)} />}
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
