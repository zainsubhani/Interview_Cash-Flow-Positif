# Task Management Application

A fullstack task management application built with TypeScript, Express (backend), and React (frontend).

## Technical Stack

### Backend

- Express.js
- TypeScript
- Zod (for validation)
- UUID (for generating unique IDs)
- CORS (for cross-origin resource sharing)
- Swagger UI (for API documentation)

### Frontend

- React
- TypeScript
- TanStack Query (React Query) for data fetching and caching
- React Hook Form for form management
- Zod for validation
- Axios for API requests

## Project Structure

```
project/
├── backend/              # Express backend
│   ├── src/
│   │   ├── types/        # Type definitions
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   ├── __tests__/    # Test files
│   │   ├── app.ts        # Express app setup
│   │   └── index.ts      # Entry point
│   ├── swagger.yaml      # Swagger API specification
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/             # React frontend
    ├── src/
    │   ├── api/          # API service
    │   ├── components/   # UI components
    │   ├── hooks/        # Custom hooks
    │   ├── types/        # Type definitions
    │   ├── __tests__/    # Test files
    │   ├── App.tsx       # Main App component
    │   └── index.tsx     # Entry point
    ├── package.json
    └── tsconfig.json
```

## Setup and Running

### Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

   The server will run on port 3001 by default.

4. Access API documentation:
   Open your browser and navigate to:
   ```
   http://localhost:3001/api-docs
   ```

### Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

   The React app will run on port 3000 by default and automatically open in your browser.

## API Endpoints

- `GET /tasks/get` - Get all tasks
- `POST /tasks/create` - Create a new task
- `GET /tasks/:id` - Get a task by ID
- `PATCH /tasks/update/:id` - Update task status
- `DELETE /tasks/delete/:id` - Delete a task

Detailed API documentation is available through Swagger UI at `/api-docs` when the server is running.

## API Documentation

The API is fully documented using OpenAPI (Swagger) specification. This provides:

- Interactive documentation for all endpoints
- Request/response schema examples
- Ability to test API calls directly from the browser
- Clear visibility of all data models and validation requirements

To access the documentation, start the backend server and navigate to http://localhost:3001/api-docs.

## Testing with Postman

You can test the API using Postman by following these steps:

1. **Create a New Collection** in Postman named "Task Management API"

2. **Set up requests for each endpoint**:

   - **Get All Tasks**

     - Method: GET
     - URL: `http://localhost:3001/tasks/get`

   - **Create Task**

     - Method: POST
     - URL: `http://localhost:3001/tasks/create`
     - Body (JSON):
       ```json
       {
         "title": "Test Task",
         "description": "Task description",
         "status": "pending"
       }
       ```

   - **Get Task by ID**

     - Method: GET
     - URL: `http://localhost:3001/tasks/{id}`
     - Replace `{id}` with an actual task ID

   - **Update Task Status**

     - Method: PATCH
     - URL: `http://localhost:3001/tasks/update/{id}`
     - Body (JSON):
       ```json
       {
         "status": "done"
       }
       ```

   - **Delete Task**
     - Method: DELETE
     - URL: `http://localhost:3001/tasks/delete/{id}`

3. **Save and Organize** these requests in your collection for easy access.

4. **Test Automation**: You can create test scripts in Postman to verify responses and automate your testing.

## Running Tests

### Backend Tests

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Run tests:

   ```
   npm test
   ```

   This will run both unit tests for the service layer and integration tests for the API endpoints.

### Frontend Tests

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Run tests:

   ```
   npm test
   ```

   This will run component tests and API service tests.

## Technical Choices

1. **Express vs Fastify**: I chose Express due to its widespread adoption, mature ecosystem, and extensive documentation which makes it easier to maintain.

2. **React Query**: Provides optimistic updates, automatic refetching, and caching which greatly improves the user experience when interacting with the tasks.

3. **Zod**: Used for schema validation on both backend and frontend to ensure type safety and consistent data structure.

4. **React Hook Form**: Provides a performant and flexible solution for handling forms with validation.

5. **Swagger Documentation**: Ensures the API is well-documented and easily understood by frontend developers or other consumers.

6. **Testing Strategy**:
   - Backend: Unit tests for service layer, integration tests for API endpoints
   - Frontend: Component tests with React Testing Library, API service tests with mocked axios

## Future Improvements

- Add more comprehensive test coverage
- Implement persistent storage (database)
- Add authentication and user-specific tasks
- Improve UI/UX with better styling and animations
- Add more advanced filtering and sorting options
- Implement pagination for better performance with large lists
