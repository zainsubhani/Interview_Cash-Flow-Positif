import { z } from "zod";

export enum TaskStatus {
  PENDING = "pending",
  DONE = "done",
}

// Make sure status is required in the schema (not optional)
export const TaskSchema = z.object({
  title: z.string().min(3, "Title is required minimum 3 char"),
  description: z.string().min(10, " minimum 10 char Description is required"),
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
