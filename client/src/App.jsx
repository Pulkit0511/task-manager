import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as removeTask,
} from "./services/taskService";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] p-6 pt-20">
      <Navbar user={user} visible={showNavbar} />
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
