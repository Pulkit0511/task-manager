import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as removeTask,
} from "./services/taskService";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = async (id) => {
    await removeTask(id);
    setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
  };

  const editTask = async (updatedTask) => {
    const updated = await updateTask(updatedTask.id, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <div className="flex justify-center mb-6">
        <TaskForm onAdd={addTask} />
      </div>
      <TaskBoard
        tasks={tasks}
        setTasks={setTasks}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
