import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(pathToSwaggerUi));

// Routes
app.use("/tasks", taskRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

export default app;
