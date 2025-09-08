import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const tasks = [
    {
      id: 1,
      title: "Setup project",
      description: "Initialize frontend with Vite + Tailwind",
      status: "Completed",
    },
    {
      id: 2,
      title: "Build Login UI",
      description: "Basic login form with styling",
      status: "In Progress",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
