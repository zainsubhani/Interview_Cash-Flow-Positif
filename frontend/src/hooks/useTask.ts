import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../api/TaskService";
import { TaskInput, TaskUpdateInput } from "../types/task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Query for fetching all tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getAllTasks,
  });

  // Mutation for creating a task
  const createTaskMutation = useMutation({
    mutationFn: (newTask: TaskInput) => taskApi.createTask(newTask),
    onSuccess: () => {
      // Invalidate and refetch the tasks query when a new task is added
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutation for updating a task's status
  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ id, update }: { id: string; update: TaskUpdateInput }) =>
      taskApi.updateTaskStatus(id, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    error,
    createTask: createTaskMutation.mutate,
    updateTaskStatus: updateTaskStatusMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskStatusMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
