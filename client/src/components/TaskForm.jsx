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
import { StatusEnum, statusLabels } from "@/utils/status";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(StatusEnum.TODO);
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate + "T00:00:00.000Z") : null,
      category: category || null,
    });
    setTitle("");
    setDescription("");
    setStatus("TODO");
    setDueDate("");
    setCategory("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="px-4 py-2 bg-[#00ADB5] text-[#EEEEEE] hover:opacity-80 cursor-pointer"
        >
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#393E46] text-[#EEEEEE] rounded-xl shadow-lg border border-[#222831]">
        <DialogTitle className="text-[#EEEEEE]">Create New Task</DialogTitle>
        <DialogDescription className="text-[#00ADB5]">
          Fill in the task details below.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
          />
          <Input
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]">
              <SelectValue placeholder="Select Status">
                {statusLabels[status]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#393E46] text-[#EEEEEE] border border-[#222831] shadow-lg rounded-md">
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="hover:bg-[#00ADB5] hover:text-[#222831] cursor-pointer"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date"
            className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
          />

          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (e.g. Work, Personal)"
            className="bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] focus:ring-[#00ADB5]"
          />

          <Button
            type="submit"
            className="mt-2 bg-[#00ADB5] text-[#222831] hover:bg-opacity-80"
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
