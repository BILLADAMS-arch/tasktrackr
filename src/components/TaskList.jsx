import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, setEditTask, toggleComplete }) {
  return tasks.length === 0 ? (
    <p className="no-tasks-message">No tasks yet. Add one!</p>
  ) : (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          setEditTask={setEditTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
