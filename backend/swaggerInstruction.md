# Setting Up Swagger Documentation

Follow these steps to integrate the Swagger documentation into your Express backend:

## 1. Install Required Dependencies

```bash
npm install swagger-ui-express yamljs
npm install --save-dev @types/swagger-ui-express @types/yamljs
```

## 2. Place the Swagger YAML File

Save the complete swagger.yaml file in the root of your backend project:

```
backend/
├── src/
│   └── ...
├── swagger.yaml    # Put the file here
├── package.json
└── tsconfig.json
```

## 3. Update the app.ts File

Ensure your `app.ts` file includes the Swagger integration code:

```typescript
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as yaml from "yamljs";
import path from "path";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Load the Swagger document
const swaggerDocument = yaml.load(path.resolve(__dirname, "../swagger.yaml"));

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
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
```

## 4. Update package.json

Ensure your package.json includes the new dependencies:

```json
"dependencies": {
  "cors": "^2.8.5",
  "express": "^4.18.2",
  "swagger-ui-express": "^4.6.3",
  "uuid": "^9.0.1",
  "yamljs": "^0.3.0",
  "zod": "^3.22.4"
},
"devDependencies": {
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/swagger-ui-express": "^4.1.3",
  "@types/uuid": "^9.0.7",
  "@types/yamljs": "^0.2.31",
  // other dev dependencies...
}
```

## 5. Handle Path Resolution in Production

For production builds, you may need to adjust the path resolution for the swagger.yaml file. Here's an alternative approach you can use:

```typescript
// Alternative path resolution that works in both development and production
const swaggerPath = path.join(process.cwd(), "swagger.yaml");
const swaggerDocument = yaml.load(swaggerPath);
```

## 6. Access the Swagger UI

Once your server is running, you can access the Swagger UI documentation at:

```
http://localhost:3001/api-docs
```

This will provide an interactive API documentation interface where you can:

- Explore all available endpoints
- See request/response formats
- Test API calls directly from the browser
