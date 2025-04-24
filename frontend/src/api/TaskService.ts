import axios from "axios";
import { Task, TaskInput, TaskUpdateInput } from "../types/task";

const API_URL = "http://localhost:3001";

export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_URL}/tasks/get`);
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await axios.get<Task>(`${API_URL}/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (task: TaskInput): Promise<Task> => {
    const response = await axios.post<Task>(`${API_URL}/tasks/create`, task);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (
    id: string,
    update: TaskUpdateInput
  ): Promise<Task> => {
    const response = await axios.patch<Task>(
      `${API_URL}/tasks/update/${id}`,
      update
    );
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/delete/${id}`);
  },
};
