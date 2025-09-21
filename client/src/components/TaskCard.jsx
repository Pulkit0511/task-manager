import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { statusLabels } from "@/utils/status";

const statusVariants = {
  TODO: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  DONE: "bg-green-100 text-green-800",
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onEdit?.(editedTask);
    setIsEditing(false);
  };
  return (
    <Card className="mb-2 shadow-sm hover:shadow-md transition-shadow border border-gray-200 bg-white cursor-grab active:cursor-grabbing">
      <CardHeader className="space-y-1 flex flex-row items-start justify-between">
        {!isEditing ? (
          <>
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                {task.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 italic mt-1 line-clamp-2">
                {task.description}
              </CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.()}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <Input
              className="font-semibold text-lg"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              placeholder="Task title"
            />
            <textarea
              className="text-sm text-gray-600 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              placeholder="Task description"
              rows={3}
            />
            <Input
              type="date"
              value={
                editedTask.dueDate
                  ? new Date(editedTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
            />

            <Input
              type="text"
              value={editedTask.category || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, category: e.target.value })
              }
              placeholder="Category (e.g. Work, Personal)"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      {!isEditing && (
        <CardContent className="space-y-2">
          <Badge
            className={`mt-2 text-xs font-medium px-3 py-1 rounded-full ${
              statusVariants[task.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {statusLabels[task.status]}
          </Badge>

          {task.dueDate && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Due:</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          {task.category && (
            <Badge className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
              {task.category}
            </Badge>
          )}
        </CardContent>
      )}
    </Card>
  );
}
