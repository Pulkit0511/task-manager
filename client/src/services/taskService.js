import api from "./api";

// Get all tasks (optionally filtered by status/category)
export const getTasks = async (params = {}) => {
  const res = await api.get("/tasks", { params });
  return res.data;
};

// Create a new task
export const createTask = async (task) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

// Update an existing task
export const updateTask = async (id, updates) => {
  const res = await api.put(`/tasks/${id}`, updates);
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};
