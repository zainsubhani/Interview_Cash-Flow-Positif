import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskInput, TaskSchema, TaskStatus } from "../types/task";

interface TaskFormProps {
  onSubmit: (data: TaskInput) => void;
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add resize listener to update component when window size changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallMobile = windowWidth <= 480;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.PENDING,
    },
  });

  // The key fix is here - don't explicitly type the function, let TypeScript infer it
  const processSubmit = (data: TaskInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          id="title"
          {...register("title")}
          className={`form-control ${errors.title ? "error" : ""}`}
          placeholder="Enter task title"
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`form-control ${errors.description ? "error" : ""}`}
          style={{ minHeight: "100px", resize: "vertical" }}
          placeholder="Enter task description"
        />
        {errors.description && (
          <p className="error-text">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary"
        style={{
          width: isSmallMobile ? "100%" : "auto",
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};
