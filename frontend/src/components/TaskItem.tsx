import React, { useState, useEffect } from "react";
import { Task, TaskStatus } from "../types/task";

interface TaskItemProps {
  task: Task;
  onStatusUpdate: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add resize listener to update component when window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallMobile = windowWidth <= 480;

  const handleStatusToggle = () => {
    const newStatus =
      task.status === TaskStatus.PENDING ? TaskStatus.DONE : TaskStatus.PENDING;
    onStatusUpdate(task.id, newStatus);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      className={`task-card ${
        task.status === TaskStatus.DONE ? "completed" : ""
      }`}
    >
      <div
        className="row"
        style={{ flexDirection: windowWidth <= 600 ? "column" : "row" }}
      >
        <div className="col">
          <h3
            style={{
              marginBottom: "8px",
              textDecoration:
                task.status === TaskStatus.DONE ? "line-through" : "none",
              color: task.status === TaskStatus.DONE ? "#888" : "inherit",
            }}
          >
            {task.title}
          </h3>
          <p
            style={{
              marginBottom: "12px",
              color: task.status === TaskStatus.DONE ? "#888" : "inherit",
            }}
          >
            {task.description}
          </p>
          <div
            className={`status-badge ${task.status}`}
            style={{ marginBottom: windowWidth <= 600 ? "16px" : "0" }}
          >
            {task.status}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isSmallMobile ? "column" : "row",
            gap: "8px",
            alignSelf: windowWidth <= 600 ? "stretch" : "center",
          }}
        >
          <button
            onClick={handleStatusToggle}
            disabled={isUpdating}
            className={`btn ${
              task.status === TaskStatus.PENDING
                ? "btn-primary"
                : "btn-secondary"
            }`}
            style={{ opacity: isUpdating ? 0.7 : 1 }}
          >
            {task.status === TaskStatus.PENDING ? "Complete" : "Reopen"}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-danger"
            style={{ opacity: isDeleting ? 0.7 : 1 }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
