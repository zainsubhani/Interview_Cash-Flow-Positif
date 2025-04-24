const request = require("supertest");
import app from "../app";
import { TaskStatus } from "../types/task";
// Import taskService with a different name to avoid duplicate identifier
import taskServiceInstance from "../services/taskService";

describe("Task Routes", () => {
  beforeEach(() => {
    // Clear all tasks before each test
    const tasks = taskServiceInstance.getAllTasks();
    tasks.forEach((task) => {
      taskServiceInstance.deleteTask(task.id);
    });
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      // Create a couple of tasks for testing
      const task1 = taskServiceInstance.createTask({
        title: "API Test Task 1",
        description: "First API test task",
        status: TaskStatus.PENDING,
      });

      const task2 = taskServiceInstance.createTask({
        title: "API Test Task 2",
        description: "Second API test task",
        status: TaskStatus.DONE,
      });

      const response = await request(app).get("/tasks/get");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: "API Test Task 1" }),
          expect.objectContaining({ title: "API Test Task 2" }),
        ])
      );
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask = {
        title: "New API Task",
        description: "Task created through API",
        status: TaskStatus.PENDING,
      };

      const response = await request(app).post("/tasks/create").send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newTask);
      expect(response.body.id).toBeDefined();
    });

    it("should return 400 for invalid input", async () => {
      const invalidTask = {
        // Missing title
        description: "Invalid task with no title",
      };

      const response = await request(app)
        .post("/tasks/create")
        .send(invalidTask);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return a specific task", async () => {
      // Create a task
      const task = taskServiceInstance.createTask({
        title: "Find API Task",
        description: "This task should be found by ID via API",
        status: TaskStatus.PENDING,
      });

      const response = await request(app).get(`/tasks/${task.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      });
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).get("/tasks/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PATCH /tasks/:id", () => {
    it("should update task status", async () => {
      // Create a task
      const task = taskServiceInstance.createTask({
        title: "Update API Task",
        description: "This task status will be updated via API",
        status: TaskStatus.PENDING,
      });

      const update = { status: TaskStatus.DONE };

      const response = await request(app)
        .patch(`/tasks/update/${task.id}`)
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: task.id,
        title: task.title,
        description: task.description,
        status: TaskStatus.DONE,
      });
    });

    it("should return 400 for invalid status", async () => {
      // Create a task
      const task = taskServiceInstance.createTask({
        title: "Invalid Update API Task",
        description: "This task will be updated with invalid status",
        status: TaskStatus.PENDING,
      });

      // Invalid status value
      const update = { status: "invalid-status" };

      const response = await request(app)
        .patch(`/tasks/update/${task.id}`)
        .send(update);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 404 for non-existent task", async () => {
      const update = { status: TaskStatus.DONE };

      const response = await request(app)
        .patch("/tasks/non-existent-id")
        .send(update);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      // Create a task
      const task = taskServiceInstance.createTask({
        title: "Delete API Task",
        description: "This task will be deleted via API",
        status: TaskStatus.PENDING,
      });

      const response = await request(app).delete(`/tasks/delete/${task.id}`);

      expect(response.status).toBe(204);

      // Verify task was deleted
      const fetchResponse = await request(app).get(`/tasks/${task.id}`);
      expect(fetchResponse.status).toBe(404);
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).delete("/tasks/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });
});
