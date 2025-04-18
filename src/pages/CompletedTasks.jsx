import React from "react";

function CompletedTasks({ tasks }) {
  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-completed-message">No tasks completed yet.</p>
      ) : (
        <ul className="completed-task-list">
          {tasks.map((task) => (
            <li key={task.id} className="completed-task-item">
              <span>{task.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedTasks;
