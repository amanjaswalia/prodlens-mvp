"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck, FaPlay, FaUndo } from "react-icons/fa";

interface Task {
  id: number;
  name: string;
  status: "todo" | "in-progress" | "completed";
  createdAt: string;
}

interface FormError {
  task?: string;
}

export default function FavoritesPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState<FormError>({});

  useEffect(() => {
    const storedTasks = localStorage.getItem("favoriteTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteTasks", JSON.stringify(tasks));
  }, [tasks]);

  const validateTask = (): boolean => {
    const newError: FormError = {};

    if (!newTask.trim()) {
      newError.task = "Task name is required";
    } else if (newTask.trim().length < 3) {
      newError.task = "Task must be at least 3 characters";
    } else if (newTask.trim().length > 100) {
      newError.task = "Task must be less than 100 characters";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTask()) return;

    const newTaskItem: Task = {
      id: Date.now(),
      name: newTask.trim(),
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
    setError({});
  };

  const handleStatusChange = (id: number, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-card-bg p-4 rounded-lg shadow-md border border-border-color mb-3 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold text-custom-text ${
              task.status === "completed" ? "line-through opacity-60" : ""
            }`}
          >
            {task.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Added: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {task.status === "todo" && (
            <button
              onClick={() => handleStatusChange(task.id, "in-progress")}
              className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="Start Progress"
            >
              <FaPlay size={14} />
            </button>
          )}
          {task.status === "in-progress" && (
            <>
              <button
                onClick={() => handleStatusChange(task.id, "todo")}
                className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                title="Move to Todo"
              >
                <FaUndo size={14} />
              </button>
              <button
                onClick={() => handleStatusChange(task.id, "completed")}
                className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                title="Mark Complete"
              >
                <FaCheck size={14} />
              </button>
            </>
          )}
          {task.status === "completed" && (
            <button
              onClick={() => handleStatusChange(task.id, "todo")}
              className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
              title="Restore"
            >
              <FaUndo size={14} />
            </button>
          )}
          <button
            onClick={() => handleDelete(task.id)}
            className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          Favorites
        </h1>
        <p className="text-custom-text">Your personal task board</p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
                if (error.task) setError({});
              }}
              placeholder="Enter a new task..."
              className={`w-full px-4 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                error.task ? "input-error border-red-500" : "border-border-color"
              }`}
            />
            {error.task && <p className="error-message mt-1">{error.task}</p>}
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FaPlus /> Add Task
          </button>
        </div>
      </form>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
              To Do
            </h2>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-custom-text rounded-full text-sm">
              {todoTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {todoTasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No tasks yet
              </p>
            ) : (
              todoTasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
              In Progress
            </h2>
            <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-sm">
              {inProgressTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No tasks in progress
              </p>
            ) : (
              inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
              Completed
            </h2>
            <span className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-full text-sm">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {completedTasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No completed tasks
              </p>
            ) : (
              completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 p-4 bg-card-bg rounded-lg border border-border-color shadow-lg">
        <h3 className="text-lg font-bold text-[#051F61] dark:text-white mb-4">
          Task Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-custom-text">{tasks.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-500">{todoTasks.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">To Do</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">{inProgressTasks.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{completedTasks.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
