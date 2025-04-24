import React from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { useTasks } from "../hooks/useTask";
import { TaskInput, TaskStatus } from "../types/task";

export const TaskManager: React.FC = () => {
  const {
    tasks,
    isLoading,
    isError,
    error,
    createTask,
    updateTaskStatus,
    deleteTask,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTasks();

  const handleCreateTask = (taskData: TaskInput) => {
    createTask(taskData);
  };

  const handleStatusUpdate = (id: string, status: TaskStatus) => {
    updateTaskStatus({ id, update: { status } });
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Task Manager
      </h1>

      <section className="section">
        <h2 className="section-title">Add New Task</h2>
        <TaskForm onSubmit={handleCreateTask} isSubmitting={isCreating} />
      </section>

      <section className="section">
        <h2 className="section-title">Tasks</h2>
        {isLoading ? (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            }}
          >
            <p>Loading tasks...</p>
            <div
              style={{
                display: "inline-block",
                width: "24px",
                height: "24px",
                border: "3px solid rgba(0, 0, 0, 0.1)",
                borderTopColor: "#3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            >
              &nbsp;
            </div>
          </div>
        ) : isError ? (
          <div
            style={{
              color: "white",
              backgroundColor: "#f44336",
              padding: "16px",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Error loading tasks:
            </p>
            <p>{error instanceof Error ? error.message : "Unknown error"}</p>
            <p style={{ marginTop: "8px" }}>
              Please check if the backend server is running.
            </p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDeleteTask}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        )}
      </section>
    </div>
  );
};
