import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ id: Date.now(), title, description, status });
    setTitle("");
    setDescription("");
    setStatus("Todo");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Task</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        overlayClassName="bg-black/70 backdrop-blur-sm"
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>Fill in the task details below.</DialogDescription>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          <Input
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 shadow-lg rounded-md">
              <SelectItem
                value="Todo"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Todo
              </SelectItem>
              <SelectItem
                value="In Progress"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                In Progress
              </SelectItem>
              <SelectItem
                value="Done"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Done
              </SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="mt-2">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
