import { v4 as uuidv4 } from "uuid";
import { Task, TaskSchema, TaskStatus, TaskUpdateSchema } from "../types/task";
import { z } from "zod";

class TaskService {
  private tasks: Task[] = [];

  // Get all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get task by ID
  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  // Create a new task
  createTask(taskData: z.infer<typeof TaskSchema>): Task {
    const validatedData = TaskSchema.parse(taskData);
    const newTask: Task = {
      ...validatedData,
      id: uuidv4(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // Update task status
  updateTaskStatus(
    id: string,
    updateData: z.infer<typeof TaskUpdateSchema>
  ): Task | undefined {
    const validatedData = TaskUpdateSchema.parse(updateData);
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        ...validatedData,
      };
      return this.tasks[taskIndex];
    }

    return undefined;
  }

  // Delete a task
  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length !== initialLength;
  }
}

export default new TaskService();
