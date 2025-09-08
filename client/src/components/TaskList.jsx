import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
  return (
    <div className="max-w-2xl mx-auto mt-10 flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
        />
      ))}
    </div>
  );
}
