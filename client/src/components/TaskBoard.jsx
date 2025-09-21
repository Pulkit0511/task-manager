import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import api from "@/services/api";
import { StatusEnum, statusLabels } from "@/utils/status";

const columns = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskBoard({ tasks, setTasks, onEdit, onDelete }) {
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Clone tasks for safety
    const updatedTasks = [...tasks];

    // Get all tasks for the source column
    const sourceTasks = updatedTasks
      .filter((t) => t.status === source.droppableId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    // Remove the dragged task
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // If moving to another column, update status
    movedTask.status = destination.droppableId;

    // Get all tasks for the destination column
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : updatedTasks
            .filter((t) => t.status === destination.droppableId)
            .sort((a, b) => a.order - b.order);

    // Insert the task at new index
    destTasks.splice(destination.index, 0, movedTask);

    // Recalculate order for source + destination columns
    sourceTasks.forEach((t, i) => (t.order = i));
    destTasks.forEach((t, i) => (t.order = i));

    // Merge everything back into updatedTasks
    const finalTasks = updatedTasks.map((t) => {
      if (t.id === movedTask.id) return movedTask;
      if (t.status === source.droppableId) {
        return sourceTasks.find((x) => x.id === t.id) || t;
      }
      if (t.status === destination.droppableId) {
        return destTasks.find((x) => x.id === t.id) || t;
      }
      return t;
    });

    setTasks(finalTasks);

    // Persist moved task to backend
    api.put(`/tasks/${movedTask.id}`, {
      status: movedTask.status,
      order: movedTask.order,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {columns.map((status) => {
          const statusTasks = tasks
            .filter((task) => task.status === status)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          if (statusTasks.length === 0) return null;

          return (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md min-h-[300px] border border-gray-200 dark:border-gray-700"
                >
                  <h2 className="text-lg font-semibold mb-4 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 sticky top-0 z-10">
                    {statusLabels[status]}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {statusTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onEdit={onEdit}
                              onDelete={() => onDelete(task.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
