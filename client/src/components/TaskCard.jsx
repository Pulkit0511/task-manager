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
  TODO: "bg-[#00ADB5] text-[#222831]",
  IN_PROGRESS: "bg-[#EEEEEE] text-[#222831]",
  DONE: "bg-[#222831] text-[#EEEEEE]",
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onEdit?.(editedTask);
    setIsEditing(false);
  };
  return (
    <Card className="mb-2 shadow-sm hover:shadow-md transition-shadow border border-[#393E46] bg-[#393E46] text-[#EEEEEE] cursor-grab active:cursor-grabbing rounded-xl">
      <CardHeader className="space-y-1 flex flex-row items-start justify-between">
        {!isEditing ? (
          <>
            <div>
              <CardTitle className="text-base font-semibold text-[#EEEEEE]">
                {task.title}
              </CardTitle>
              <CardDescription className="text-sm text-[#00ADB5] italic mt-1 line-clamp-2">
                {task.description}
              </CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-[#222831] rounded">
                  <MoreVertical className="h-4 w-4 text-[#EEEEEE]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#393E46] border border-[#222831] text-[#EEEEEE]">
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
              className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              placeholder="Task title"
            />
            <textarea
              className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              placeholder="Task description"
              rows={3}
            />
            <Input
              className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
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
              className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
              type="text"
              value={editedTask.category || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, category: e.target.value })
              }
              placeholder="Category (e.g. Work, Personal)"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-[#00ADB5] text-[#222831] hover:bg-opacity-80"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border border-[#00ADB5] text-[#00ADB5]"
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
            <p className="text-sm text-[#EEEEEE]">
              <span className="font-medium text-[#00ADB5]">Due:</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          {task.category && (
            <Badge className="bg-[#00ADB5] text-[#222831] text-xs font-medium px-2 py-1 rounded">
              {task.category}
            </Badge>
          )}
        </CardContent>
      )}
    </Card>
  );
}
