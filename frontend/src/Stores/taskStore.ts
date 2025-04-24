import { create } from "zustand";
import { Task, TaskStatus } from "../types/task";

interface TaskState {
  // Optional UI state that might be useful across components
  taskViewMode: "all" | "pending" | "completed";

  // Actions
  setTaskViewMode: (mode: "all" | "pending" | "completed") => void;

  // Filtered tasks selector
  getFilteredTasks: (tasks: Task[]) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  // Initial state
  taskViewMode: "all",

  // Set task view mode action
  setTaskViewMode: (mode) => set({ taskViewMode: mode }),

  // Filtered tasks selector
  getFilteredTasks: (tasks: Task[]) => {
    const { taskViewMode } = get();

    switch (taskViewMode) {
      case "pending":
        return tasks.filter((task) => task.status === TaskStatus.PENDING);
      case "completed":
        return tasks.filter((task) => task.status === TaskStatus.DONE);
      case "all":
      default:
        return tasks;
    }
  },
}));
