import React, { useState, useEffect } from "react";

function TaskForm({ addTask, editTask, updateTask, cancelEdit }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTask) setText(editTask.text);
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    editTask ? updateTask(editTask.id, text) : addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">{editTask ? "Update" : "Add"}</button>
      {editTask && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}

export default TaskForm;
