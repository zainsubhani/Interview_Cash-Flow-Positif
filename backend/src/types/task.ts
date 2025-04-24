import { z } from "zod";

// Task status enum
export enum TaskStatus {
  PENDING = "pending",
  DONE = "done",
}
// Task schema with Zod for validation
export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.DONE])
    .default(TaskStatus.PENDING),
});

// Task schema for update operations
export const TaskUpdateSchema = z.object({
  status: z.enum([TaskStatus.PENDING, TaskStatus.DONE]),
});

// Task type derived from schema
export type Task = z.infer<typeof TaskSchema> & {
  id: string;
};
