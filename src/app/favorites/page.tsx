"use client";
import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  status: "todo" | "in-progress" | "completed";
}

const Favorites: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(1);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks) as Task[];
      setTasks(parsedTasks);
      if (parsedTasks.length > 0) {
        setTaskId(parsedTasks[parsedTasks.length - 1].id + 1);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskItem: Task = {
        id: taskId,
        name: newTask,
        status: "todo",
      };
      setTasks([...tasks, newTaskItem]);
      setTaskId(taskId + 1);
      setNewTask("");
    }
  };

  const handleMoveToInProgress = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "in-progress" } : task
      )
    );
  };

  const handleMoveToCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "completed" } : task
      )
    );
  };

  const renderCard = (task: Task) => {
    return (
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4" key={task.id}>
        <h3 className="text-xl font-bold">{task.name}</h3>
        <p>Status: {task.status}</p>
        <div className="flex justify-between mt-2">
          {task.status === "todo" && (
            <button
              onClick={() => handleMoveToInProgress(task.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Start Progress
            </button>
          )}
          {task.status === "in-progress" && (
            <button
              onClick={() => handleMoveToCompleted(task.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Favorites - To-Do List</h1>

      <form onSubmit={handleAddTask} className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Tasks</h2>

        <div>
          <h3 className="text-xl font-semibold mb-2">To-Do</h3>
          {tasks.filter((task) => task.status === "todo").map(renderCard)}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">In Progress</h3>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map(renderCard)}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Completed</h3>
          {tasks.filter((task) => task.status === "completed").map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
