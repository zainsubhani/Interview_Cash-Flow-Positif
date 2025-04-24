import { z } from "zod";
// Task status enum
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["DONE"] = "done";
})(TaskStatus || (TaskStatus = {}));
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
