// src/routes/taskRoutes.ts
import express, { Request, Response } from "express";
import { z } from "zod";
import taskService from "../services/taskService";
import { TaskSchema, TaskUpdateSchema } from "../types/task";

const router = express.Router();

// GET /tasks - Get all tasks
router.get("/get", (req: Request, res: Response) => {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
});

// POST /tasks - Create a new task
router.post("/create", (req: Request, res: Response) => {
  try {
    const validatedData = TaskSchema.parse(req.body);
    const newTask = taskService.createTask(validatedData);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// GET /tasks/:id - Get a task by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const task = taskService.getTaskById(id);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(200).json(task);
});

// PATCH /tasks/:id - Update task status
router.patch("/update/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = TaskUpdateSchema.parse(req.body);
    const updatedTask = taskService.updateTaskStatus(id, validatedData);

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = taskService.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
});

export default router;
