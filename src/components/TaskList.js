import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import { getTasks, saveTasks } from "../utils/localStorage";
import "../styles/TaskList.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      return getTasks();
    }
    return [];
  });

  const [filter, setFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveTasks(tasks);
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
    toast.success("Task created successfully!");
    setOpenModal(false);
  };

  const updateTask = (updatedTask) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task deleted successfully!");
  };

  const filtered = tasks.filter((t) =>
    filter === "All"
      ? true
      : filter === "Completed"
      ? t.completed
      : !t.completed
  );

  return (
    <div className="task-dashboard">
      <div className="header-row">
        <h2 className="welcome">Welcome, {username}!</h2>
        <button className="create-task-btn" onClick={() => setOpenModal(true)}>
          + Create Task
        </button>
      </div>

      <div className="filters">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? "active" : ""}`}
          >
            {f} (
            {
              tasks.filter((t) =>
                f === "All"
                  ? true
                  : f === "Completed"
                  ? t.completed
                  : !t.completed
              ).length
            }
            )
          </button>
        ))}
      </div>

      <TaskTable
        tasks={filtered}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      {openModal && (
        <div className="modal-backdrop" onClick={() => setOpenModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <TaskForm onAdd={addTask} />
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TaskList;
