import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskManager } from "./components/TaskManager";

// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <TaskManager />
      </div>
    </QueryClientProvider>
  );
};

export default App;
