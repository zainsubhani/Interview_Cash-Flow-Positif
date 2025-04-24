// import React, { useState, useEffect } from "react";
import { Task, TaskStatus } from "../types/task";
import { TaskItem } from "./TaskItem";
import { useTaskStore } from "../Stores/taskStore";

interface TaskListProps {
  tasks: Task[];
  onStatusUpdate: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusUpdate,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) => {
  const { taskViewMode, setTaskViewMode, getFilteredTasks } = useTaskStore();

  const filteredTasks = getFilteredTasks(tasks);

  if (tasks.length === 0) {
    return <p>No tasks available. Add your first task using the form above.</p>;
  }

  return (
    <div>
      <div className="filter-container">
        <button
          onClick={() => setTaskViewMode("all")}
          className={`btn ${taskViewMode === "all" ? "btn-secondary" : ""}`}
          style={{
            backgroundColor: taskViewMode === "all" ? "#2196f3" : "#e0e0e0",
            color: taskViewMode === "all" ? "white" : "black",
          }}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setTaskViewMode("pending")}
          className={`btn ${taskViewMode === "pending" ? "btn-secondary" : ""}`}
          style={{
            backgroundColor: taskViewMode === "pending" ? "#2196f3" : "#e0e0e0",
            color: taskViewMode === "pending" ? "white" : "black",
          }}
        >
          Pending ({tasks.filter((t) => t.status === TaskStatus.PENDING).length}
          )
        </button>
        <button
          onClick={() => setTaskViewMode("completed")}
          className={`btn ${
            taskViewMode === "completed" ? "btn-secondary" : ""
          }`}
          style={{
            backgroundColor:
              taskViewMode === "completed" ? "#2196f3" : "#e0e0e0",
            color: taskViewMode === "completed" ? "white" : "black",
          }}
        >
          Completed ({tasks.filter((t) => t.status === TaskStatus.DONE).length})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks match the current filter.</p>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
};
