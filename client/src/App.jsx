import { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Setup DB",
      description: "Configure PostgreSQL in Docker",
      status: "In Progress",
      order: 0,
    },
    {
      id: 2,
      title: "Create UI",
      description: "Build Task Manager UI with Tailwind & shadcn/ui",
      status: "Todo",
      order: 0,
    },
    {
      id: 3,
      title: "Test Backend",
      description: "Ensure APIs are working",
      status: "Done",
      order: 0,
    },
  ]);

  const addTask = (task) => setTasks([task, ...tasks]);

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <div className="flex justify-center mb-6">
        <TaskForm onAdd={addTask} />
      </div>
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
