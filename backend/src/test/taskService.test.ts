// src/__tests__/taskService.test.ts
import taskServiceModule from "../services/taskService";
import { TaskStatus as TaskStatusEnum } from "../types/task";

// Use the imported service without renaming
const taskService = taskServiceModule;

describe("Task Service", () => {
  beforeEach(() => {
    // Clear all tasks before each test
    const tasks = taskService.getAllTasks();
    tasks.forEach((task) => {
      taskService.deleteTask(task.id);
    });
  });

  test("should create a new task", () => {
    const taskData = {
      title: "Test Task",
      description: "This is a test task",
      status: TaskStatusEnum.PENDING,
    };

    const newTask = taskService.createTask(taskData);

    expect(newTask).toMatchObject({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
    });
    expect(newTask.id).toBeDefined();
  });

  test("should get all tasks", () => {
    // Create a few tasks
    const task1 = taskService.createTask({
      title: "Task 1",
      description: "First task",
      status: TaskStatusEnum.PENDING,
    });
    const task2 = taskService.createTask({
      title: "Task 2",
      description: "Second task",
      status: TaskStatusEnum.DONE,
    });

    const allTasks = taskService.getAllTasks();

    expect(allTasks).toHaveLength(2);
    expect(allTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Task 1" }),
        expect.objectContaining({ title: "Task 2" }),
      ])
    );
  });

  test("should get task by ID", () => {
    // Create a task
    const task = taskService.createTask({
      title: "Find Me Task",
      description: "This task should be found by ID",
      status: TaskStatusEnum.PENDING,
    });

    const foundTask = taskService.getTaskById(task.id);

    expect(foundTask).toBeDefined();
    expect(foundTask?.id).toBe(task.id);
    expect(foundTask?.title).toBe(task.title);
  });

  test("should return undefined for non-existent task ID", () => {
    const foundTask = taskService.getTaskById("non-existent-id");
    expect(foundTask).toBeUndefined();
  });

  test("should update task status", () => {
    // Create a task
    const task = taskService.createTask({
      title: "Update Me Task",
      description: "This task status will be updated",
      status: TaskStatusEnum.PENDING,
    });

    const updatedTask = taskService.updateTaskStatus(task.id, {
      status: TaskStatusEnum.DONE,
    });

    expect(updatedTask).toBeDefined();
    expect(updatedTask?.status).toBe(TaskStatusEnum.DONE);

    // Fetch the task again to verify the update was persisted
    const fetchedTask = taskService.getTaskById(task.id);
    expect(fetchedTask?.status).toBe(TaskStatusEnum.DONE);
  });

  test("should return undefined when updating non-existent task", () => {
    const updatedTask = taskService.updateTaskStatus("non-existent-id", {
      status: TaskStatusEnum.DONE,
    });

    expect(updatedTask).toBeUndefined();
  });

  test("should delete a task", () => {
    // Create a task
    const task = taskService.createTask({
      title: "Delete Me Task",
      description: "This task will be deleted",
      status: TaskStatusEnum.PENDING,
    });

    // Verify task exists
    expect(taskService.getTaskById(task.id)).toBeDefined();

    // Delete the task
    const deleted = taskService.deleteTask(task.id);

    // Verify deletion was successful
    expect(deleted).toBe(true);
    expect(taskService.getTaskById(task.id)).toBeUndefined();
  });

  test("should return false when deleting non-existent task", () => {
    const deleted = taskService.deleteTask("non-existent-id");
    expect(deleted).toBe(false);
  });
});
