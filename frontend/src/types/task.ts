import { z } from "zod";

export enum TaskStatus {
  PENDING = "pending",
  DONE = "done",
}

// Make sure status is required in the schema (not optional)
export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.nativeEnum(TaskStatus), // No .default() here to keep it required
});

export const TaskUpdateSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});

// This will ensure TaskInput has all fields required
export type TaskInput = z.infer<typeof TaskSchema>;
export type TaskUpdateInput = z.infer<typeof TaskUpdateSchema>;

export type Task = TaskInput & {
  id: string;
};
